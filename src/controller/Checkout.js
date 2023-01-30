import { checkoutCollection } from "../config/database.js";

export default async function checkoutF(req, res){
    const shoppingdata = req.body;
    const idBuyer = res.locals.user;

    try {
        await checkoutCollection.insertOne({... shoppingdata, idBuyer});
        res.status(201).send("Compra registrada com sucesso");
    } catch (error) {
        res.status(500).send(error.message);        
    }  

}