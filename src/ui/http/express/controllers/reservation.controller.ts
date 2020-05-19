import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";
import moment from "moment"
import { JWTToken } from "../utils/JWTToken";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { sendSuccessResponse } from "../utils/response";
import { GetAllReservationService } from "../../../../application/reservation/GetAllReservationService";
import { AddReservationService } from "src/application/reservation/AddReservationService";
import { ReservationRequest } from "src/application/reservation/AddReservationRequest";

@controller("/reservation")
export class ReservationController implements interfaces.Controller {
  constructor(
    protected readonly _reservationService: GetAllReservationService,
    protected readonly _addReservationService: AddReservationService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/", role([Role.super_admin, Role.company]))
  public async index(@request() req: Request, @response() res: Response) {
    if (req.user.role == "super_admin") {
      const data = await this._reservationService.execute();
      if (!data) {
        throw new Error("No data");
      }
      return data;
    }

    if (req.user.role == "company") {
      return "company";
    }
  }

  @httpPost("/create", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const company = req.user;
    const { asset_id } = req.body; 
    const now = moment() 
    const data = await this._addReservationService.execute(
      new ReservationRequest(asset_id, company.id, 1, now, null, 0)
    );

    sendSuccessResponse(res, "create reservation success", data);
  }
}
