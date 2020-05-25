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
import { AddRentalAssetRequest } from "src/application/rental/AddRentalAssetRequest";
import { AddRentalAssetService } from "src/application/rental/AddRentalAssetService";
import { UpdateRentalAvailabilityService } from "src/application/rental/UpdateRentalAvailabilityService";
import { UpdateRentalAvailabilityRequest } from "src/application/rental/UpdateRentalAvailabilityRequest";

@controller("/rental")
export class RentalController implements interfaces.Controller {
  constructor(
    protected readonly _addRentalAssetService: AddRentalAssetService,
    protected readonly _updateRentalAvailabilityService: UpdateRentalAvailabilityService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpPost("/add", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const user = req.user;
    const { asset } = req.body;
    const data = await this._addRentalAssetService.execute(
      new AddRentalAssetRequest(asset, user.id, 0)
    );

    sendSuccessResponse(res, "add rental item success", data);
  }

  @httpPost("/avail/update", role(Role.company))
  public async updateAvailability(@request() req: Request, @response() res: Response) {
    const { id, status } = req.body;
    const data = await this._updateRentalAvailabilityService.execute(
      new UpdateRentalAvailabilityRequest(id, status)
    );

    sendSuccessResponse(res, "update rental availability success", data);
  }
}
