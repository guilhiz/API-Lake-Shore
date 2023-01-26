import Joi from "joi"

export const signInSchema = Joi.object({
    email: Joi.email().required(),
    password: Joi.string().required()
})