import express from "express";
import authRouter from "./auth.router";
import nftRouter from "./nft.router";

const appRoutes = express.Router();

appRoutes.use("/auth", authRouter);
appRoutes.use("/nft", nftRouter);

export default appRoutes;
