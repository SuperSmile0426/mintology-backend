import express from "express";
import { authController } from "controllers";

const authRouter = express.Router();

// User Sign Up
authRouter.post(
  "/sign-up",
  authController.signUpValidator(),
  authController.signUp
);

// User Sign In
authRouter.post(
  "/sign-in",
  authController.signInValidator(),
  authController.signIn
);

export default authRouter;
