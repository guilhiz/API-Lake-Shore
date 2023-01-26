import { Router } from "express";
import newProduct from "../controller/newProduct.js";
import { productValidate } from "../middleware/productValidate.js";

const productRouter = Router();
productRouter.post("/new-product", productValidate, newProduct);

export default productRouter;