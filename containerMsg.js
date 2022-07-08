class FirebaseContainer {
    constructor(collection){
        this.db = admin.firestore();
        this.query = db.collection(collection);
    }

    async save(object) {
        try{
            const doc = this.query.doc();
            await doc.create(object);
            console.log('Saved');
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        }
        
    }

    async getAll() {
        try{
            const querySnapshot = await this.query.get();
            let docs = querySnapshot.docs;

            const data = docs.map(doc => {doc.data()});

            return data;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async getById(id) {
        try{
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            const data = item.data();

            return data;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async updateById(id, object) {
        try{
            const doc = this.query.doc(`${id}`);
            let item = await doc.update(object);

            return item;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async deleteById(id) {
        try{
            const doc = query.doc(`${id}`);
            const item = await doc.delete();
            
            return item;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }

    async deleteAll() {
        try{
            //ask
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }
}

export default FirebaseContainer;