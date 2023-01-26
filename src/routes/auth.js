import express from "express"
import { signIn } from "../controller/auth"
import { signInValidate } from "../middleware/auth"

const authRoute = express.Router()

authRoute.post('/sign-in', signInValidate, signIn)

export default authRoute