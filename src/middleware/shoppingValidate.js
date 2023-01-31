
import { sessionsCollection } from "../config/database.js";
import shoppingSchema from "../schema/shoppingSchema.js";

export default async function shoppingValidate(req, res, next) {
  const shoppingdata = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");  
  

  const { error } = shoppingSchema.validate(shoppingdata, { abortEarly: false });
  if (error) {
    const errosList = error.details.map((detail) => detail.message);
    return res.status(422).send(errosList);
  }

  try {
    const user = await sessionsCollection.findOne({ token });
    res.locals.user = user._id;

    next();
  } catch (error) {
    res.status(500).send("Erro no servidor");
  }}