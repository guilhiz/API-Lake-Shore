import { productsCollection } from "../config/database.js";

export default async function newProduct (req, res){    
    const product = req.body;
    const user= res.locals.user;
   
    try {
        await productsCollection.insertOne({... product, idSeller: user.idUser});
        res.status(201).send("Produto registrado com sucesso");
    } catch (error) {
        res.status(500).send(error.message);        
    }   
}