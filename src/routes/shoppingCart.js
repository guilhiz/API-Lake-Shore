import express from 'express'
import { getCart } from '../controller/shoppingCart.js'

export const cardRouter = express.Router()

cardRouter.get('/cart', getCart)

