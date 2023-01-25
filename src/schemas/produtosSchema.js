import joi from "joi";

export const produtoSchema = joi.object({
    nome: joi.string().required(),
    imagem: joi.string().required(),
    descricao:joi.string().min(10).required(),
    valor:joi.number().min(2).required(),
    categoria:joi.string().required()
});