import { Request, Response } from "express";
import { body, query } from "express-validator";
import httpStatus from "http-status";

import { nftService } from "services";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper } from "utils";

export const getNFTsValidator = () => {
  return [query("project_id").notEmpty().withMessage("Project Id is required")];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = {
  project_id: string;
};

export const getNFTsHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { project_id } = req.query;

  const userNFTs = await nftService.getNFTs(req.user._id, project_id);

  res.status(httpStatus.OK).json({ nfts: userNFTs });
};

export const getNFTs = errorHandlerWrapper(getNFTsHandler);
