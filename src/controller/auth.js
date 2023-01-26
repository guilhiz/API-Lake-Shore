import { userCollection } from "../config/database"
import bcrypt from 'bcrypt'

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const user = await userCollection.findOne({email})
    if (!user){
        return res.status(401).send("Usuario não cadastrado!")
    }
    const passwordCompare = bcrypt.compareSync(password, user.password)
    if (!passwordCompare){
        return res.status(401).send("Senha está incorreta!")
    } else {
        return res.send()
    }

}