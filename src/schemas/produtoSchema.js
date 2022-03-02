import joi from "joi";

const produtoSchema = joi.object({
    nome: joi.string().required(),
    preco: joi.number().integer().required()
});

export default produtoSchema;