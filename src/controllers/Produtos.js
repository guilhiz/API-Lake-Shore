import db from "../config/database.js";

export default async function criaProduto (req, res){
    
    const produto = req.body;
    const usuario = res.locals.usuario;
   
    try {
        await db.collection("produtos").insertOne({... produto, idVendedor: usuario.idUsuario});
        res.status(201).send("Produto registrado com sucesso");
    } catch (error) {
        res.status(500).send(error.message);        
    }   

}