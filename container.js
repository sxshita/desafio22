class MongoDbContainer {
    constructor(mongo, db, coll){
        this.db = db;
        this.coll = coll;
        this.mongo = mongo;
    }

    async save(object) {
        try{
            const res = await this.mongo.db(this.db).collection(this.coll).insertOne(object);
            console.log(res)
            return res;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async getAll() {
        try{
            const allDocumentsFromCollection = await this.mongo.db(this.db).collection(this.coll).find().toArray();
            return allDocumentsFromCollection;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async getById(id) {
        try {
            const allDocumentsFromCollection = await this.getAll();
            const document = allDocumentsFromCollection.find(d => d.id === id);
            return document;
        }
        catch {

        }
    }

    async createArrayMessages() {
        try{
            const arrayMessagesFromScratch = {id: 444, messages: []};
            const res = await this.save(arrayMessagesFromScratch);
            return res.id;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async updateById(id, object) {
        try{
            const objectUpdate = await this.mongo.db(this.db).collection(this.coll).updateOne({id: id}, {
                $set: object
            });
            return objectUpdate;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async saveMessage(arrayMessagesId, message) {
        try {
            if(arrayMessagesId && message){
                let arrayMessages = await this.getById(arrayMessagesId);

                const messages = arrayMessages.messages;
                messages.push(message);

                arrayMessages.messages = messages;

                await this.updateById(arrayMessagesId, arrayMessages);
            }
            else {
                console.log('Mensaje o ID de mensajes no ingresado');
            }
        }
        catch(err){
            console.log(`ERROR: ${err}`);
        }
    }

}

module.exports = MongoDbContainer;