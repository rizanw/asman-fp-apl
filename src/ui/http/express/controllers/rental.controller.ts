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
import { GetRentalAssetExceptOwnerService } from "src/application/rental/GetRentalAssetExceptOwnerService";
import { CreateRentalTransactionService } from "src/application/rental/CreateRentalTransactionService";
import { CreateRentalTransactionRequest } from "src/application/rental/CreateRentalTransactionRequest";
import { GetRentalTransactionByRenterService } from "src/application/rental/GetRentalTransactionByRenterService";
import { UpdateRentalTransactionDateService } from "src/application/rental/UpdateRentalTransactionDateService";
import { UpdateRentalTransactionDateRequest } from "src/application/rental/UpdateRentalTransactionDateRequest";
import { DeleteRentalAssetService } from "src/application/rental/DeleteRentalAssetService";
import { DeleteRentalAssetRequest } from "src/application/rental/DeleteRentalAssetRequest";
import { UpdateRentalTransactionStatusService } from "src/application/rental/UpdateRentalTransactionStatusService";
import { UpdateRentalTransactionStatusRequest } from "src/application/rental/UpdateRentalTransactionStatusRequest";

@controller("/rental")
export class RentalController implements interfaces.Controller {
  constructor(
    protected readonly _addRentalAssetService: AddRentalAssetService,
    protected readonly _getRentalAssetExceptOwnerService: GetRentalAssetExceptOwnerService,
    protected readonly _createRentalTransactionService: CreateRentalTransactionService,
    protected readonly _getRentalTransactionByRenterService: GetRentalTransactionByRenterService,
    protected readonly _updateRentalTransactionDateService: UpdateRentalTransactionDateService,
    protected readonly _deleteRentalAssetService: DeleteRentalAssetService,
    protected readonly _updateRentalTransactionStatusService: UpdateRentalTransactionStatusService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  // Use-case 1
  @httpGet("/avail", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const { company } = req.user;
    const data = await this._getRentalAssetExceptOwnerService.execute(company.id);

    if (!data) {
      throw new Error("No data");
    }

    sendSuccessResponse(res, "", data);
  }

  // Use-case 2
  @httpPost("/rent", role(Role.company))
  public async rent(@request() req: Request, @response() res: Response) {
    const {company} = req.user;
    const { rental, duration, date } = req.body; 
    const data = await this._createRentalTransactionService.execute(
      new CreateRentalTransactionRequest(rental, company.id, duration, date)
    );

    sendSuccessResponse(res, "create transaction succed", data)
  }

  // Use-case 3
  @httpGet("/renting", role(Role.company))
  public async renting(@request() req: Request, @response() res: Response) {
    const {company} = req.user;
    const data = await this._getRentalTransactionByRenterService.execute(company.id)
    
    sendSuccessResponse(res, "", data)
  }

  // Use-case 4
  @httpPost("/renting/date", role(Role.company))
  public async changeDate(@request() req: Request, @response() res: Response) {
    const { transaction, date } = req.body;
    const data = await this._updateRentalTransactionDateService.execute(
      new UpdateRentalTransactionDateRequest(transaction, date)
    )
    
    sendSuccessResponse(res, "update transaction succed", data)
  }

  // Use-case 5 & 6
  @httpPost("/rented/update", role(Role.company))
  public async updateStatus(@request() req: Request, @response() res: Response) {
    const {transaction, status} = req.body;
    const data = await this._updateRentalTransactionStatusService.execute(
      new UpdateRentalTransactionStatusRequest(transaction, status)
    )
    
    sendSuccessResponse(res, "update transaction succed", data)
  }

  // Use-case 7
  @httpPost("/avail/delete", role(Role.company))
  public async deleteAvailability(@request() req: Request, @response() res: Response) {
    const {rental} = req.body;
    const data = await this._deleteRentalAssetService.execute(
      new DeleteRentalAssetRequest(rental)
    );

    sendSuccessResponse(res, "delete rental item success", data);
  }

  @httpPost("/add", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const { company } = req.user;
    const { asset } = req.body;
    const data = await this._addRentalAssetService.execute(
      new AddRentalAssetRequest(asset, company.id, 0)
    );

    sendSuccessResponse(res, "add rental item success", data);
  }

}
