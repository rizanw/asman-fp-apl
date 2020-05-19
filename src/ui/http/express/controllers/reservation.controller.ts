import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";
import moment from "moment";
import { JWTToken } from "../utils/JWTToken";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { sendSuccessResponse } from "../utils/response";
import { GetAllReservationService } from "../../../../application/reservation/GetAllReservationService";
import { AddReservationService } from "src/application/reservation/AddReservationService";
import { AddReservationRequest } from "src/application/reservation/AddReservationRequest";
import { UpdateStatusService } from "src/application/reservation/UpdateStatusService";
import { UpdateStatusRequest } from "src/application/reservation/UpdateStatusRequest";
import { GetReservationByBorrowerService } from "src/application/reservation/GetReservationByBorrowerService";

@controller("/reservation")
export class ReservationController implements interfaces.Controller {
  constructor(
    protected readonly _reservationService: GetAllReservationService,
    protected readonly _addReservationService: AddReservationService,
    protected readonly _updateStatusService: UpdateStatusService,
    protected readonly _getReservationByBorrowerService: GetReservationByBorrowerService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/", role(Role.super_admin))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._reservationService.execute();
    if (!data) {
      throw new Error("No data");
    }
    return data;
  }

  @httpPost("/update", role(Role.super_admin))
  public async update(@request() req: Request, @response() res: Response) {
    const user = req.user;
    const {id, status} = req.body;
    const now = moment();
    const data = await this._updateStatusService.execute(
      new UpdateStatusRequest(id, user.id, status)
    );

    sendSuccessResponse(res, "update status success", data);

  }

  @httpPost("/create", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const user = req.user;
    const { asset } = req.body;
    const now = moment();
    const data = await this._addReservationService.execute(
      new AddReservationRequest(asset, user.id, null, now, null, 0)
    );

    sendSuccessResponse(res, "create reservation success", data);
  }

  @httpGet("/status", role(Role.company))
  public async list(@request() req: Request, @response() res: Response) {
    const user = req.user;
    const data = await this._getReservationByBorrowerService.execute(user.id);

    if (!data) {
      throw new Error("No data");
    }

    sendSuccessResponse(res, "", data);
  }
}
