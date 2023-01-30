import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from './routes/auth.js'
import productRouter from './routes/ProductsRoutes.js'
import { cardRouter } from "./routes/shoppingCart.js"
import checkoutRouter from "./routes/CheckoutRoute.js"
dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())

server.use([authRoute, productRouter, cardRouter, checkoutRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})