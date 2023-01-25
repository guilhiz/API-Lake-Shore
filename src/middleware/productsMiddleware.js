import { produtoSchema } from "../schemas/produtosSchema.js";
import db from "../config/database.js";

export async function produtosValidacao(req, res, next) {
    const produtoRecebido = req.body;
    const {token} = req.headers;

    const {error} = produtoSchema.validate(produtoRecebido, {abortEarly: false});
    if(error){
        const listaErros = error.details.map((detail) => (detail.message));
        return res.status(422).send(listaErros);
    }

    if(!token){
        return res.status(401).send("Faça login para continuar");
    }
    try {
        const usuario = await db.collection("sessoes").findOne({token});
        res.locals.usuario = usuario;
                
    } catch (error) {
        return res.status(500).send("Erro no servidor");
    }

    next();

}