import joi from 'joi';

const shoppingSchema = joi.object({  
    nameCard: joi.string().required(),
    cpf: joi.number().required(),
    digit: joi.number().required(),
    valid: joi.string().required(),
    secCode: joi.number().required()
});

export default shoppingSchema;