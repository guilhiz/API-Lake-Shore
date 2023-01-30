import checkoutF from "../controller/Checkout.js";
import { Router } from "express";
import shoppingValidate from "../middleware/shoppingValidate.js"

const checkoutRouter = Router();


checkoutRouter.post("/checkoutfinal", shoppingValidate, checkoutF);
export default checkoutRouter;
