// const Knex = require('knex').default;

// const optionsSqlite3 = {
//     client: 'sqlite3',
//     connection: {
//       filename: './db/ecommerce.db'
//     },
//     useNullAsDefault: true
// };

// const optionsMySql = {
//     client: 'mysql',
//     connection: {
//       host : '127.0.0.1',
//       port : 3306,
//       user : 'root',
//       password : 'root',
//       database : 'ecommerce'
//     }
// };

// const knex3 = Knex(optionsSqlite3);
// const knex = Knex(optionsMySql);


// const executeMySql = async () => {
//     try {
//         await knex.schema.dropTableIfExists("products");
//         await knex.schema.createTable("products", (table) => {
//             table.increments("id").primary().notNullable();
//             table.string("title", 15).notNullable();
//             table.string("code", 10).notNullable();
//             table.float("price");
//             table.integer("stock");
//             table.string("thumbnail", 60);
//             table.string("description", 150);
//             table.dateTime("timestamp");
//         })
//         await knex("products").insert([
//             {title: "Producto 1", code: "PROD1", price: 10, stock: 5, thumbnail: "asdasdasd", description: "asdasdasdas" },
//             {title: "Producto 2", code: "PROD2", price: 10, stock: 5, thumbnail: "asdasdasd", description: "asdasdasdas"},
//             {title: "Producto 3", code: "PROD3", price: 10, stock: 5, thumbnail: "asdasdasd", description: "asdasdasdas"}
//         ]);
//         const res = await knex.from("products").select("*")
//         console.log(res);
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// const executeSqlite3 = async () => {
//     try {
//         await knex3.schema.dropTableIfExists("messages");
//         await knex3.schema.createTable("messages", (table) => {
//             table.increments("id").primary().notNullable();
//             table.string("author", 20).notNullable();
//             table.string("text", 150).notNullable();
//             table.dateTime("date");
//         });
//         await knex3("messages").insert([
//             {author: "sasha", text: "PROD1"},
//             {author: "sasha", text: "PROD1"},
//             {author: "sasha", text: "PROD1"}
//           ]);
//          const res = await knex3.from("messages").select("*");
//          console.log(res);
//     }
//     catch(err) {
//       console.log(err)
//     }
// }

// executeMySql();
// executeSqlite3();