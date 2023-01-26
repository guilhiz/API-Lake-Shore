import express from "express"
import { signIn } from "../controller/auth.js"
import { signInValidate } from "../middleware/auth.js"

const authRoute = express.Router()

authRoute.post('/sign-in', signInValidate, signIn)

export default authRoute