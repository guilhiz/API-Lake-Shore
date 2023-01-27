import { productsCollection } from "../config/database.js";

export default async function getProducts(req, res){
    try {
        let productsList = await productsCollection.find().toArray();
        for(let i=0; i< productsList.length; i++){
            delete productsList[i].idSeller;
        }
        res.status(200).send(productsList);
        
    } catch (error) {
        res.status(500).send(error.message);
    }

}