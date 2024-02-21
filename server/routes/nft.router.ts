import express from "express";
import { nftController } from "controllers";
import { checkAuth } from "middlewares";

const nftRouter = express.Router();

// Get Image Url
nftRouter.post("/nftlink", checkAuth, nftController.getImageUrl);

// Mint NFT
nftRouter.post(
  "/mint",
  checkAuth,
  nftController.mintNFTValidator(),
  nftController.mintNFT
);

// Get NFT
nftRouter.get(
  "/token",
  checkAuth,
  nftController.getNFTValidator(),
  nftController.getNFT
);

// Get NFTs
nftRouter.get(
  "",
  checkAuth,
  nftController.getNFTsValidator(),
  nftController.getNFTs
);

// Update NFT
nftRouter.put(
  "/token",
  checkAuth,
  nftController.updateNFTValidator(),
  nftController.updatetNFT
);

export default nftRouter;
