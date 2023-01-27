import { signInSchema, signUpSchema } from "../schema/auth.js"

export const signInValidate = (req, res, next) => {
    const { email, password } = req.body
    const validation = signInSchema.validate({email, password})
    if (validation.error){
        const errors = validation.error.details.map((e) => e.message)
        return res.status(422).send(errors)
    }
    next()
}

export const signUpValidate = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    const validation = signUpSchema.validate({name, email, password, confirmPassword})
    if (validation.error){
        const errors = validation.error.details.map((e) => e.message)
        return res.status(422).send(errors)
    }
    next()
}