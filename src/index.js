import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from './routes/auth.js'
import productRouter from './routes/ProductsRoutes.js'
import { cardRouter } from "./routes/shoppingCart.js"
dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())

server.use([authRoute, productRouter, cardRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})