import produtoSchema from "../schemas/produtoSchema.js";

export function validateProdutoSchema(req, res, next) {
    const produto = req.body;
  
    const validation = produtoSchema.validate(produto);
    if (validation.error) {
        console.log(validation.error);
      return res.sendStatus(422);
    }
  
    next();
  }