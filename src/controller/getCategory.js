import { productsCollection } from "../config/database.js";


export default async function getCategory(req, res) {
    const category = req.params.category;

    try {

        const showProducts = await productsCollection.find({category}).toArray();
        for(let i=0; i< showProducts.length; i++){
            delete showProducts[i].idSeller;
        }
        res.status(200).send(showProducts);

    } catch (error) {
        res.status(500).send(error.message);
    }

}