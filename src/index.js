import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())


server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})