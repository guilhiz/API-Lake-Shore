import { cartCollection, sessionsCollection } from "../config/database.js"

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