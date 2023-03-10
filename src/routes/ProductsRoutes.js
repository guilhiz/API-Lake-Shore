import { Router } from "express";
import newProduct from "../controller/newProduct.js";
import getProducts from "../controller/getProducts.js";
import getCategory from "../controller/getCategory.js";
import { productValidate} from "../middleware/productValidate.js";
import { tokenValidate } from "../middleware/tokenValidade.js";

const productRouter = Router();
productRouter.use(tokenValidate)

productRouter.post("/new-product", productValidate, newProduct);
productRouter.get("/all-products", getProducts);
productRouter.get("/products/:category", getCategory);

export default productRouter;