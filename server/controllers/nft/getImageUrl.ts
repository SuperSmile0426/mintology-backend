import { Request, Response } from "express";
import httpStatus from "http-status";
import path from "path";

import { ArgumentValidationError, CustomError } from "errors";
import { errorHandlerWrapper } from "utils";
import { uploadFileToS3 } from "utils";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;
type ReqFile = unknown;

export const getImageUrlHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery, ReqFile>,
  res: Response
) => {
  if (req.files) {
    const metadata = req.files.image;
    const extensionName = path.extname(metadata.name);
    const allFileTypes = [
      ".png",
      ".PNG",
      ".jpg",
      ".JPG",
      ".jpeg",
      ".gif",
      ".mp4",
      ".MP4",
      ".mp3",
      ".MP3",
      ".obj",
    ];

    if (!allFileTypes.includes(extensionName)) {
      throw new CustomError("File type is incorrect.", httpStatus.BAD_REQUEST);
    }

    const uploadedFile = await uploadFileToS3(
      req.user.id,
      "nfts/image",
      metadata.data,
      metadata.name
    );

    res.status(httpStatus.OK).json({ nftImageLink: uploadedFile.Location });
  } else {
    throw new CustomError("File is not exist.", httpStatus.BAD_REQUEST);
  }
};

export const getImageUrl = errorHandlerWrapper(getImageUrlHandler);
