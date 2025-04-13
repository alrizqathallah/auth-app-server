import { Request, Response, NextFunction } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import HttpStatus from "../configs/http.config";
import AppError from "../configs/error.config";
import userModel from "../models/user.model";
import env from "../configs/env.config";

class UserController {
  // Signup Controller
  public async singup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(
        new AppError("Missing details required", HttpStatus.BAD_REQUEST)
      );
    }

    try {
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new AppError("User already exists", HttpStatus.CONFLICT));
      }

      // Hasing Password
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        name,
        email,
        password: hashPassword,
      });
      await user.save();

      const token = jwt.sign(
        { user: user._id },
        env.secret as Secret,
        { expiresIn: env.expiresIn } as SignOptions
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: env.environment === "production",
        sameSite: env.environment === "production" ? "none" : "strict",
        maxAge: env.expiresIn * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.CREATED).json({
        status: "success",
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Login Controller
  public async login(): Promise<void> {}

  // Logout Controller
  public async logout(): Promise<void> {}
}

export default UserController;
