import { Request } from "express";

import { UserModel } from "models";

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  user: UserModel;
}
