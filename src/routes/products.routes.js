import { Router } from "express";
import criaProduto from "../controllers/Produtos.js";
import { produtosValidacao } from "../middleware/productsMiddleware.js";
const productRouter = Router();

productRouter.post("/criaproduto", produtosValidacao, criaProduto);
export default  productRouter;