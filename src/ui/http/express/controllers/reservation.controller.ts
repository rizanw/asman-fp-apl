import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

import { JWTToken } from "../utils/JWTToken";
import role from "../middlewares/role";
import { Role } from '../../../../domain/models/Role';
import { GetAllReservationService } from "../../../../application/reservation/GetAllReservationService";

@controller("/reservation")
export class ReservationController implements interfaces.Controller {
  constructor( 
    protected readonly _reservationService: GetAllReservationService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/", role(Role.super_admin))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._reservationService.execute();

    if (!data) {
      throw new Error("No data");
    }

    return data
  }

}
