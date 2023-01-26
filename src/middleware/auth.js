import { signInSchema } from "../schema/auth"

export const signInValidate = (req, res, next) => {
    const { email, password } = req.body
    const validation = signInSchema.validate({email, password})
    if (validation.error){
        const errors = validation.error.details.map((e) => e.message)
        return res.status(422).send(errors)
    }
    next()
}