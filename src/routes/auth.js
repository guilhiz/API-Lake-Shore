import express from "express"
import { signInValidate } from "../middleware/auth"

const authRoute = express.Router()

authRoute.post('/sign-in', signInValidate)

export default authRoute