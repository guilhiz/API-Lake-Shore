import productSchema from "../schema/productSchema.js";
import { sessionsCollection } from "../config/database.js";

export async function productValidate(req, res, next) {
  const productReceived = req.body;
  const {token} = res.locals

  const { error } = productSchema.validate(productReceived, { abortEarly: false });
  if (error) {
    const errosList = error.details.map((detail) => detail.message);
    return res.status(422).send(errosList);
  }

  try {
    const user = await sessionsCollection.findOne({ token });

    if (!user) return res.status(401).send("Usuário não encontrado");
    res.locals.user = user;

    next();
  } catch (error) {
    res.status(500).send("Erro no servidor");
  }
}
