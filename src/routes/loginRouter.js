import { Router } from "express";
import { login } from "../controllers/authController.js";
import { validateLoginSchema } from "../middlewares/validateLoginSchema.js";

const loginRouter=Router();

loginRouter.post("/login",validateLoginSchema, login);

export default loginRouter;