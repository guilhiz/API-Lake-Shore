import { MongoClient } from "mongodb"

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

try {
    await mongoClient.connect()
    db = mongoClient.db()
} catch (error) {
    console.log('Deu erro no server')
}
