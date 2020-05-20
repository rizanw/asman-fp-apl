import {
  controller,
  interfaces,
  httpGet,
  httpPost,
  response,
  request,
} from "inversify-express-utils";
import { GetReadyServicesService } from "src/application/service/GetReadyServicesService";
import { Request, Response } from "express";
import User from "src/domain/models/User";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import { GetBacklogServicesService } from "src/application/service/GetBacklogServicesService";
import { GetFinishedServicesService } from "src/application/service/GetFinishedServicesService";
import { GetProcessedServicesService } from "src/application/service/GetProcessedServicesService";
import { Role } from "src/domain/models/Role";
import role from "src/ui/http/express/middlewares/role";
import { ReleaseServicesService } from "src/application/service/ReleaseServicesService";
import { FinishServicesService } from "src/application/service/FinishServicesService";
import { GetUnplannedAssetsService } from "src/application/service/GetUnplannedAssetsService";
import { SetServicePlanService } from "src/application/service/SetServicePlanService";
import SetServicePlanRequest from "src/application/service/SetServicePlanRequest";
import { GetServicePlanCsvService } from "src/application/service/GetServicePlanCsvService";

import * as csv from "fast-csv";
import multer from "multer";
import { UpdateServicePlanByCsvService } from "src/application/service/UpdateServicePlanByCsvService";

const upload = multer({ dest: "uploads" });

@controller("/services")
export class ServiceController implements interfaces.Controller {
  constructor(
    protected readonly releaseServicesService: ReleaseServicesService,
    protected readonly finishServicesService: FinishServicesService,
    protected readonly getUnplannedAssetsService: GetUnplannedAssetsService,
    protected readonly getReadyServicesService: GetReadyServicesService,
    protected readonly getProcessedServicesService: GetProcessedServicesService,
    protected readonly getFinishedServicesService: GetFinishedServicesService,
    protected readonly getBacklogServicesService: GetBacklogServicesService,
    protected readonly setServicePlanService: SetServicePlanService,
    protected readonly getServicePlanCsvService: GetServicePlanCsvService,
    protected readonly updateServicePlanByCsvService: UpdateServicePlanByCsvService
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

  @httpPost("/plan", role(Role.company))
  public async setServicePlan(req: Request, res: Response) {
    try {
      const { asset_id, start_date, long, periodic } = req.body;
      await this.setServicePlanService.execute(
        new SetServicePlanRequest(asset_id, start_date, long, periodic)
      );

      sendSuccessResponse(res, "Service plan updated");
    } catch (error) {
      sendErrorResponse(res, error.message);
    }
  }

  @httpGet("/csv", role(Role.company))
  public async getServicePlanCsv(req: Request, res: Response) {
    try {
      const user = req.user as User;

      if (!user) {
        throw new Error("Unauthenticated");
      }

      const csvData = await this.getServicePlanCsvService.execute(user);

      res.setHeader("content-type", "text/csv");
      res.setHeader(
        "Content-disposition",
        "attachment; filename=service_plan_template.csv"
      );

      csv.writeToStream(res, csvData);
    } catch (error) {
      sendErrorResponse(res, error.message);
    }
  }

  @httpPost("/csv", role(Role.company), upload.single("csv"))
  public async updateServicePlanCsv(req: Request, res: Response) {
    try {
      if (!req.file) throw new Error("CSV not uploaded");

      const header = [
        "asset_id",
        "Nama Aset",
        "Induk",
        "Sub Induk",
        "Equipment",
        "Nomor Seri",
        "start_date",
        "long",
        "periodic",
      ];

      const reader = csv.parseFile(req.file.path, {
        headers: header,
        renameHeaders: true,
      });

      reader.on("error", (error) => {
        throw error;
      });

      reader.on("data", async (row) => {
        const { asset_id, start_date, long, periodic } = row;

        await this.setServicePlanService.execute(
          new SetServicePlanRequest(asset_id, start_date, long, periodic)
        );
      });

      reader.on("end", async (rowCount: number) => {});

      sendSuccessResponse(res, "Service plan updated");
    } catch (error) {
      sendErrorResponse(res, error.message);
    }
  }
}
