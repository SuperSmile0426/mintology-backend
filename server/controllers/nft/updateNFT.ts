import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { nftService } from "services";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper, updateNFTMintolgy } from "utils";

export const updateNFTValidator = () => {
  return [
    body("project_id").notEmpty().withMessage("Project Id is required"),
    body("token_id").notEmpty().withMessage("Project Id is required"),
    body("name").notEmpty().withMessage("NFT mame is required"),
    body("image").notEmpty().withMessage("NFT Image is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  token_id: string;
  name: string;
  image: string;
  project_id: string;
  description?: string;
  animation_url?: string;
  title?: string;
  sub_title?: string;
  attributes?: any;
};
type ReqQuery = unknown;

export const updateNFTHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {
    project_id,
    token_id,
    name,
    image,
    animation_url,
    description,
    title,
    sub_title,
    attributes,
  } = req.body;

  const tokenExist = await nftService.getNFT(
    req.user._id,
    project_id,
    token_id
  );

  if (tokenExist) {
    const newMetadata = {
      name: name,
      image: image,
      animation_url: animation_url ? animation_url : "",
      description: description ? description : "",
      attributes: attributes ? attributes : [],
      title: title ? title : "",
      sub_title: sub_title ? sub_title : "",
    };

    // const updatedMetaData = await updateNFTMintolgy(project_id, token_id, newMetadata)

    const updatedNFT = await nftService.updateNFT(tokenExist._id, newMetadata);

    res.status(httpStatus.OK).json({ updatedNFT: updatedNFT });
  } else {
    throw new CustomError(
      "Token is not exist.",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const updatetNFT = errorHandlerWrapper(updateNFTHandler);
