import { Router } from "express";

import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/signup", (req, res, next) =>
  userController.singup(req, res, next)
);

export default router;
