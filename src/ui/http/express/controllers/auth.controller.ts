import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";

import { AuthenticationService } from "src/application/authentication/AuthenticationService";
import { AuthenticationRequest } from "src/application/authentication/AuthenticationRequest";
import { JWTToken } from "../utils/JWTToken";
import { sendSuccessResponse } from "../utils/response";

@controller("")
export class AuthController implements interfaces.Controller {
  constructor(
    protected readonly _authenticationService: AuthenticationService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpPost("/login")
  public async login(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    const user = await this._authenticationService.execute(
      new AuthenticationRequest(username, password)
    );

    if (!user) {
      throw new Error("Credentials not match");
    }

    const token = this._jwtUtil.generateToken(
      {},
      user.id!.toString(),
      "asset_management",
      0,
      "7d"
    );

    sendSuccessResponse(res, "Login success", {
      token: token,
      token_type: "Bearer",
      user: user,
    });
  }
}
