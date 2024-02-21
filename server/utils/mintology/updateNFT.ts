import httpStatus from "http-status";
import api from "api";

import { CustomError } from "errors";

const sdk = api("@mintology/v1.0#21jd1slskqyxs6");

export const updateNFTMintolgy = async (
  project_id: string,
  token_id: string,
  metadata: any
) => {
  try {
    console.log(project_id, token_id, metadata);
    sdk.auth(process.env.MINTOLOGY_KEY);
    sdk.server(process.env.MINTOLOGY_BASE_URL);
    const res = await sdk.metadataUpdate(
      {
        metadata: metadata,
      },
      {
        projectId: project_id,
        tokenId: token_id,
      }
    );

    return res.data.data;
  } catch (err) {
    console.log(err.message);
    throw new CustomError(
      "Failed to call Mintolgy Dev Server!",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
