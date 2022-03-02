import {Router} from 'express';
import { createProdutos, createUser } from '../controllers/userController.js';
import { validateProdutoSchema } from '../middlewares/validateProdutoSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { validateUserSchema } from '../middlewares/validateUserSchema.js';

const userRouter=Router();

userRouter.post("/usuarios",validateUserSchema, createUser);
userRouter.post("/usuarios/produtos",validateToken,validateProdutoSchema,createProdutos)

export default userRouter;