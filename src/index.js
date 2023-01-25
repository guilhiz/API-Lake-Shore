import express from 'express';
import cors from 'cors';
import productRouter from './routes/products.routes.js';
const server = express();
server.use(cors());
server.use(express.json());

const PORT = 5000;

server.use([productRouter])

server.listen(PORT, () => {
    console.log("Servidor operando na porta " + PORT);
})