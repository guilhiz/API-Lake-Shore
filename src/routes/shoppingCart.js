import express from 'express'
import { addProductInCart, closeShoppingCart, getCart, getProductsInCart } from '../controller/shoppingCart.js'
import { tokenValidate } from '../middleware/tokenValidade.js'

export const cardRouter = express.Router()

cardRouter.get('/cart', getCart)
cardRouter.get('/cart/products', tokenValidate, getProductsInCart)
cardRouter.post('/addItemCart', tokenValidate, addProductInCart)
cardRouter.post('/closeShoppingCart', closeShoppingCart)

