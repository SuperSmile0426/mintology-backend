import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { nftService } from "services";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper, mintNFTMintolgy } from "utils";

export const mintNFTValidator = () => {
  return [
    body("name").notEmpty().withMessage("NFT mame is required"),
    body("image").notEmpty().withMessage("NFT Image is required"),
    body("wallet_address").notEmpty().withMessage("Wallet Address is required"),
    body("project_id").notEmpty().withMessage("Project Id is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  name: string;
  image: string;
  wallet_address: string;
  project_id: string;
  description?: string;
  animation_url?: string;
  title?: string;
  sub_title?: string;
  premint_id?: string;
  attributes?: any;
};
type ReqQuery = unknown;

export const mintNFTHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {
    name,
    image,
    wallet_address,
    project_id,
    animation_url,
    description,
    title,
    sub_title,
    premint_id,
    attributes,
  } = req.body;

  const metadata = {
    name: name,
    image: image,
    animation_url: animation_url ? animation_url : "",
    description: description ? description : "",
    attributes: attributes ? attributes : [],
    title: title ? title : "",
    sub_title: sub_title ? sub_title : "",
  };

  const tokenId = await mintNFTMintolgy(
    project_id,
    req.user.email,
    wallet_address,
    premint_id,
    metadata
  );

  const nftData = {
    user_id: req.user._id,
    project_id: project_id,
    wallet_address: wallet_address,
    token_id: tokenId,
    premint_id: premint_id ? premint_id : "",
    ...metadata,
  };

  const newNFT = await nftService.createNFT(nftData);

  res.status(httpStatus.OK).json({ newNFT: newNFT });
};

export const mintNFT = errorHandlerWrapper(mintNFTHandler);
