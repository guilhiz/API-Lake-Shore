import { usersCollection } from "../config/database.js"
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const user = await usersCollection.findOne({email})
    if (!user){
        return res.status(401).send("Usuário não cadastrado!")
    }
    const passwordCompare = bcrypt.compareSync(password, user.password)
    if (!passwordCompare){
        return res.status(401).send("Senha está incorreta!")
    } 
    const token = uuid()
    return res.send({token, user_id: user._id})

}

export const signUp = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    const user = await usersCollection.findOne({email})
    if (user){
        return res.status(400).send("Email já esta sendo usado!")
    }
    const passwordCrypted = bcrypt.hashSync(password, 10)
    await usersCollection.insertOne({name , email, password: passwordCrypted})
    return res.status(201).send("Usuário criado com sucesso!")
}