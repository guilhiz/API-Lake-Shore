import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from './src/routes/auth.js'
import productRouter from './src/routes/ProductsRoutes.js'
import { cardRouter } from "./src/routes/shoppingCart.js"
import checkoutRouter from "./src/routes/CheckoutRoute.js"
dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())

server.use([authRoute, productRouter, cardRouter, checkoutRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})