class MongoDbContainer {
    constructor(mongo, db, coll){
        this.db = db;
        this.coll = coll;
        this.mongo = mongo;
    }

    async save(object) {
        try{
            const prod = await this.mongo.db(this.db).collection(this.coll).insertOne(object);
            console.log(prod)
            return prod;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async getAll() {
        try{
            const all = await this.mongo.db(this.db).collection(this.coll).find().toArray();
            return all;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

}

module.exports = MongoDbContainer;