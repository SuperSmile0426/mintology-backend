import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { nftService } from "services";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper } from "utils";

export const getNFTValidator = () => {
  return [
    body("project_id").notEmpty().withMessage("Project Id is required"),
    body("token_id").notEmpty().withMessage("Token Id is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  project_id: string;
  token_id: string;
};
type ReqQuery = unknown;

export const getNFTHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { project_id, token_id } = req.body;

  const userNFTs = await nftService.getNFT(req.user._id, project_id, token_id)

  res.status(httpStatus.OK).json({nfts:userNFTs});
};

export const getNFT = errorHandlerWrapper(getNFTHandler);
