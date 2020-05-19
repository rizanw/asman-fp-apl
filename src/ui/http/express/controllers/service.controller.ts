import {
  controller,
  interfaces,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { GetReadyServicesService } from "src/application/service/GetReadyServicesService";
import { Request, Response } from "express";
import User from "src/domain/models/User";
import { sendSuccessResponse } from "../utils/response";
import { GetBacklogServicesService } from "src/application/service/GetBacklogServicesService";
import { GetFinishedServicesService } from "src/application/service/GetFinishedServicesService";
import { GetProcessedServicesService } from "src/application/service/GetProcessedServicesService";
import { Role } from "src/domain/models/Role";
import role from "src/ui/http/express/middlewares/role";
import { ReleaseServicesService } from "src/application/service/ReleaseServicesService";
import { FinishServicesService } from "src/application/service/FinishServicesService";
import { GetUnplannedAssetsService } from "src/application/service/GetUnplannedAssetsService";

@controller("/services")
export class ServiceController implements interfaces.Controller {
  constructor(
    protected readonly releaseServicesService: ReleaseServicesService,
    protected readonly finishServicesService: FinishServicesService,
    protected readonly getUnplannedAssetsService: GetUnplannedAssetsService,
    protected readonly getReadyServicesService: GetReadyServicesService,
    protected readonly getProcessedServicesService: GetProcessedServicesService,
    protected readonly getFinishedServicesService: GetFinishedServicesService,
    protected readonly getBacklogServicesService: GetBacklogServicesService
  ) {}

  @httpPost("/release", role(Role.company))
  public async releaseServices(req: Request, res: Response) {
    const service_ids: number[] = req.body.service_id;

    const numOfReleasedServices = await this.releaseServicesService.execute(
      service_ids
    );

    sendSuccessResponse(res, `${numOfReleasedServices} services released`);
  }

  @httpPost("/finish", role(Role.company))
  public async finishServices(req: Request, res: Response) {
    const service_ids: number[] = req.body.service_id;

    const numOfReleasedServices = await this.finishServicesService.execute(
      service_ids
    );

    sendSuccessResponse(res, `${numOfReleasedServices} services finished`);
  }

  @httpGet("/unplanned", role(Role.company))
  public async getUnplanned(req: Request, res: Response) {
    const user = req.user as User;

    const assets = await this.getUnplannedAssetsService.execute(user);

    sendSuccessResponse(res, "", assets);
  }

  @httpGet("/ready", role(Role.company))
  public async getReady(req: Request, res: Response) {
    const user = req.user as User;

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const services = await this.getReadyServicesService.execute(user);

    sendSuccessResponse(res, "", services);
  }

  @httpGet("/process", role(Role.company))
  public async getProcess(req: Request, res: Response) {
    const user = req.user as User;

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const services = await this.getProcessedServicesService.execute(user);

    sendSuccessResponse(res, "", services);
  }

  @httpGet("/finish", role(Role.company))
  public async getFinish(req: Request, res: Response) {
    const user = req.user as User;

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const services = await this.getFinishedServicesService.execute(user);

    sendSuccessResponse(res, "", services);
  }

  @httpGet("/backlog", role(Role.company))
  public async getBacklog(req: Request, res: Response) {
    const user = req.user as User;

    if (!user) {
      throw new Error("Unauthenticated");
    }

    const services = await this.getBacklogServicesService.execute(user);

    sendSuccessResponse(res, "", services);
  }
}
