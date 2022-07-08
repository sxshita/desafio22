import MongoDbContainer from "../container";

class productDAO extends MongoDbContainer {
    constructor(){
        super('products')
    }
}

export default productDAO;