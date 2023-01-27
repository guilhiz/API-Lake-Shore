import express from "express"
import { signIn, signUp } from "../controller/auth.js"
import { signInValidate, signUpValidate } from "../middleware/auth.js"

const authRoute = express.Router()

authRoute.post('/sign-in', signInValidate, signIn)
authRoute.post('/sign-up', signUpValidate, signUp)

export default authRoute