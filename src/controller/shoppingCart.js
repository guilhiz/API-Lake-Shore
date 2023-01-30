import { ObjectId } from "mongodb"
import { cartCollection, productsCollection, sessionsCollection } from "../config/database.js"

export const getCart = async (req, res) => {
    const { authorization } = req.headers
    if (authorization){
        const token = authorization.replace('Bearer ', '')
        try {
            const session = await sessionsCollection.findOne({token})
            if (!session){
                return res.status(401).send("")
            }
            const cart = await cartCollection.findOne({user_id : session.user_id, finished: false})
            if (cart){
                return res.send(cart)
            } else {
                return createCart(session.user_id)
            }
        } catch (error) {
        }
    }
}

export const createCart = async (user_id) => {
    try {
        let newCard = {user_id, items: [], quantity: 0, amount: 0.0, finished: false}
        const result = await cartCollection.insertOne(newCard)
        return {...newCard, _id: result.insertedId}
    } catch (error) {
    }
}

export const addProductInCart = async (req, res) => {
    const { cart_id, product_id } = req.body
    try {
        const cart = await cartCollection.findOne({_id: ObjectId(cart_id)})
        if (!cart){
            return res.status(401).send()
        }
        const product = await productsCollection.findOne({_id: ObjectId(product_id)})
            if (!product){
                return res.status(500).send()
            }
        const verifyItems = cart.items.filter(e => e.product_id === product_id)
        if (verifyItems.length > 0){
            cart.items.forEach((e) => {
                if (e.product_id === product_id){
                    e.quantity++
                }
            })
            const cartUpdate = {_id: ObjectId(cart_id), user_id: cart.user_id, items: cart.items, quantity: cart.quantity + 1, amount: Number(Number(cart.amount) + Number(product.price)).toFixed(2), finished: false}
            const result = await cartCollection.updateOne({_id: ObjectId(cart_id)}, { $set: {quantity: cartUpdate.quantity, items: cartUpdate.items, amount: cartUpdate.amount}})
            if (result.modifiedCount === 1) return res.send(cartUpdate)
            return res.status(500).send()
        } else {
            const cartUpdate = {_id: ObjectId(cart_id), user_id: cart.user_id, items: cart.items.concat({product_id, quantity: 1}), quantity: cart.quantity + 1, amount: Number(Number(cart.amount) + Number(product.price)).toFixed(2), finished: false}
            const result = await cartCollection.updateOne({_id: ObjectId(cart_id)}, { $set: {quantity: cartUpdate.quantity, items: cartUpdate.items, amount: cartUpdate.amount}})
            if (result.modifiedCount === 1) return res.send(cartUpdate)
            return res.status(500).send()
        }
    } catch (error) {
        
    }
}

export const getProductsInCart = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        const session = await sessionsCollection.findOne({token})
        if (!session) return res.status(401).send()
        const cart = await cartCollection.findOne({user_id: session.user_id, finished: false})
        if (!cart) return res.status(401).send()
        let retorno = cart.items.map(async item => {
            const response = await productsCollection.findOne({_id: ObjectId(item.product_id)})
            return {product: response, quantity: item.quantity}
        })
        const products = await Promise.all(retorno);
        let sumProducts = products.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
        return res.send({products, sumProducts: sumProducts.toFixed(2), cart_id: cart._id})
    } catch (error) {
        
    }
}

export const closeShoppingCart = async (req, res) => {
    const { cart_id } = req.body
    try {
        const response = await cartCollection.updateOne({_id: ObjectId(cart_id)}, { $set : {finished: true}})
        if (response.modifiedCount === 1) return res.send()
        res.status(500).send()
    } catch (error) {
    }
}