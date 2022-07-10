const { faker } = require('@faker-js/faker');
const express = require('express');
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const MongoDbContainer = require('./container');
const {MongoClient} = require('mongodb');

let products;
let msg;
let messages;
async function connectMongo() {
  try {
    const mongo = new MongoClient("mongodb+srv://sasha:coder.sasha@cluster0.ezluz.mongodb.net/?retryWrites=true&w=majority");
    products = new MongoDbContainer(mongo, 'ecommerce', 'products');
    // msg = new MongoDbContainer(mongo, 'chat', 'messages');
    messages = new MongoDbContainer(mongo, 'chat', 'messages');
    await mongo.connect();
  }
  catch(err) {
      console.log(`ERROR: ${err}`);
  }
}
connectMongo();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set('views','./public/views');
app.set('view engine','hbs');

app.engine(
  'hbs',
  engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
  })
);

async function cargarProductos() {
  let products = [];
  for(let i = 0; i < 6; i++) {
    let product = {
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
    }
    products.push(product);
  }
  return products;
}

app.get('/', async (req, res) => {
  const prods = await products.getAll();
  res.render('table', { prods });
});

app.get('/api/productos-test', async (req, res) => {
  const prods = await cargarProductos();
  res.render('table-test', { prods });
});

// ** [WEBSOCKETS] ** //
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', async (socket) => {
  const myMessages = await messages.getById(333);
 
  socket.emit('products', await products.getAll());
  if(myMessages) socket.emit('messages', myMessages.messages);

  socket.on('new_product', async (product) => {
    try {
      await products.save(product);
      let prods = await products.getAll();
      socketServer.sockets.emit('products', prods);
    }
    catch(err) {
      console.log(err);
    }
    
  });

  socket.on('new_message', async (message) => {
    try {
      const arrayMessagesId = 333;
      await messages.saveMessage(arrayMessagesId, message);
      let arrayMessages = await messages.getById(arrayMessagesId);
      socketServer.sockets.emit('messages', arrayMessages.messages);
    }
    catch(err){
      console.log(`error: ${err}`);
     }
  });

});

httpServer.listen(8080, () => {
  console.log('Servidor corriendo en puerto 8080');
})