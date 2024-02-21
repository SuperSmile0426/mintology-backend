import httpStatus from "http-status";
import api from "api";

import { CustomError } from "errors";

const sdk = api("@mintology/v1.0#21jd1slskqyxs6");

export const mintNFTMintolgy = async (
  project_id: string,
  email: string,
  wallet_address: string,
  premint_id: string,
  metadata: any
) => {
  try {
    sdk.auth(process.env.MINTOLOGY_KEY);
    sdk.server(process.env.MINTOLOGY_BASE_URL);
    const res = await sdk.mintMint(
      {
        metadata: metadata,
        email: email,
        wallet_address: wallet_address,
        premint_id: premint_id,
      },
      {
        projectId: project_id,
      }
    );

    return res.data.data["token_id"];
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Failed to call Mintolgy Dev Server!",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
