import joi from 'joi';

const productSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().min(10).required(),
    price: joi.number().min(2).required(),
    category: joi.string().required()
});

export default productSchema;