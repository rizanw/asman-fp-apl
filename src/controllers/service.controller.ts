import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import moment from "moment";
import * as csv from "fast-csv";
import Service from "../models/service";
import { sendSuccessResponse } from "../helpers/response";
import Asset, { ServicePlan } from "../models/asset";
import Group from "../models/group";
import { NotFoundError } from "../helpers/error";
import axios from "axios";

class ServiceController {
  public async getUnplanned(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let assets = await Asset.findAll({
        where: {
          service_plan: null
        },
        include: [{
          association: Asset.associations.group,
          where: {
            company_id: company_id,
          },
          include: [{
            association: Group.associations.parent,
            include: [{
                association: Group.associations.parent
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", assets);
    } catch (error) {
      next(error);
    }
  }

  public async getUnplannedCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let assets = await Asset.findAll({
        where: {
          service_plan: null
        },
        include: [{
          association: Asset.associations.group,
          where: {
            company_id: company_id,
          },
          include: [{
            association: Group.associations.parent,
            include: [{
                association: Group.associations.parent
            }]
          }]
        }]
      });

      let data = [];
      let header = [
        'ID Aset', 'Nama Aset', 'Induk', 'Sub Induk', 'Equipment', 'Nomor Seri',
        'Tgl. Mulai', 'Lama', 'Periodik'
      ];

      data.push(header);
      assets.forEach((asset: any) => {
        data.push([
          asset.id, asset.name, asset.group.parent.parent.name, asset.group.parent.name, asset.group.name,
          asset.serial_number, '', '', ''
        ]);
      });

      res.setHeader('Content-disposition', 'attachment; filename=service_plan_template.csv');
      res.setHeader('content-type', 'text/csv');

      csv.writeToStream(res, data);
    } catch (error) {
      next(error);
    }
  }

  public async getUpdatePlanCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let assets = await Asset.findAll({
        include: [{
          association: Asset.associations.group,
          where: {
            company_id: company_id,
          },
          include: [{
            association: Group.associations.parent,
            include: [{
                association: Group.associations.parent
            }]
          }]
        }]
      });

      let data = [];
      let header = [
        'ID Aset', 'Nama Aset', 'Induk', 'Sub Induk', 'Equipment', 'Nomor Seri',
        'Tgl. Mulai', 'Lama', 'Periodik'
      ];

      data.push(header);
      assets.forEach((asset: any) => {
        let start_date = "", long = "", periodic = "";
        if (asset.service_plan) {
          start_date = asset.service_plan.start_date;
          long = asset.service_plan.long;
          periodic = asset.service_plan.periodic;
        }

        data.push([
          asset.id, asset.name, asset.group.parent.parent.name, asset.group.parent.name, asset.group.name,
          asset.serial_number, start_date, long, periodic
        ]);
      });

      res.setHeader('Content-disposition', 'attachment; filename=service_plan_template.csv');
      res.setHeader('content-type', 'text/csv');

      csv.writeToStream(res, data);
    } catch (error) {
      next(error);
    }
  }

  public async uploadCsv(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error('CSV not uploaded');

      let header = [
        'asset_id', 'Nama Aset', 'Induk', 'Sub Induk', 'Equipment', 'Nomor Seri',
        'start_date', 'long', 'periodic'
      ];

      let reader = csv.parseFile(req.file.path, { headers: header, renameHeaders: true });

      reader.on('error', error => {
        next(error);
      });
  
      reader.on('data', async row => {
        const { asset_id, start_date, long, periodic } = row;

        let asset = await Asset.findByPk(asset_id, {
          include: [
            {
              association: Asset.associations.services
            }
          ]
        });
        
        if (!asset) {
          throw new NotFoundError("Asset not found.");
        }

        let service_plan: ServicePlan | null = null;
        if (start_date && long && periodic) {
          service_plan = {
            start_date: start_date,
            long: long,
            periodic: periodic
          }
        }
  
        asset.update({
          service_plan: service_plan
        });
        
        let services = asset.services;
        let now = moment();
  
        for (let service of services!) {
          if (now.isSameOrBefore(moment(service.end_date)) && service.status == 0) {
            await service.destroy();
          }
        }
  
        if (start_date && long && periodic) {
          let edate = moment(start_date).add(long - 1, 'days');
    
          asset.createService({
            asset_id: asset.id,
            start_date: start_date,
            end_date: edate.format('YYYY-MM-DD')
          });
        }
      });
  
      reader.on('end', async (rowCount: number) => {
        sendSuccessResponse(res, "Service plan updated.");
      });
    } catch (error) {
      next(error);
    }
  }

  public async getReady(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let now = moment().toDate();
      let services = await Service.findAll({
        where: {
          start_date: {
            [Op.lte]: now
          },
          end_date: {
            [Op.gte]: now
          },
          status: 0
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async getReleased(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let services = await Service.findAll({
        where: {
          status: Service.STATUS_RELEASED
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async getProcess(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let services = await Service.findAll({
        where: {
          status: Service.STATUS_PROCESS
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async getComplete(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let services = await Service.findAll({
        where: {
          status: Service.STATUS_COMPLETE
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async getFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let services = await Service.findAll({
        where: {
          status: Service.STATUS_FINISH
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async getBacklog(req: Request, res: Response, next: NextFunction) {
    try {
      const company_id = (req.user as any).company_id;
      let now = moment().toDate();
      let services = await Service.findAll({
        where: {
          end_date: {
            [Op.lt]: now
          },
          status: 0
        },
        include: [{
          association: Service.associations.asset,
          include: [{
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [{
              association: Group.associations.parent,
              include: [{
                  association: Group.associations.parent
              }]
            }]
          }]
        }]
      });

      sendSuccessResponse(res, "", services);
    } catch (error) {
      next(error);
    }
  }

  public async order(req: Request, res: Response, next: NextFunction) {
    try {
      const service_ids: [] = req.body.service_id;
      const kategori_pekerjaan_id = req.body.kategori_pekerjaan_id;
      const tipe_ac_id = req.body.tipe_ac_id;
      const tgl_order = req.body.date;

      let requestError: boolean = false;

      for (let id of service_ids) {
        const service = await Service.findByPk(id, {
          include: [{
            association: Service.associations.asset,
            include: [{
              association: Asset.associations.group,
              include: [{
                association: Group.associations.parent,
                include: [{
                  association: Group.associations.parent,
                  include: [{
                    association: Group.associations.company
                  }]
                }]
              }]
            }]
          }]
        });

        if (!service) {
          throw new NotFoundError("Service not found.");
        }

        const company = service.asset?.group?.parent?.parent?.company;
        const induk = service.asset?.group?.parent?.parent;
        const subinduk = service.asset?.group?.parent;
        const equipment = service.asset?.group;

        let alamat = null;
        let latitude = null;
        let longitude = null;
        let telp = null;
        if (equipment?.address && equipment.latitude != null && equipment.longitude != null && equipment.tel) {
          alamat = equipment.address;
          latitude = equipment.latitude;
          longitude = equipment.longitude;
          telp = equipment.tel;
        } else if (subinduk?.address && subinduk.latitude != null && subinduk.longitude != null && subinduk.tel) {
          alamat = subinduk.address;
          latitude = subinduk.latitude;
          longitude = subinduk.longitude;
          telp = subinduk.tel;
        } else if (induk?.address && induk.latitude != null && induk.longitude != null && induk.tel) {
          alamat = induk.address;
          latitude = induk.latitude;
          longitude = induk.longitude;
          telp = induk.tel;
        } 
        
        const client_id = service.id;
        const client_detail = {
          id: service.id,
          nama: company?.name,
          email: company?.email,
          telp: telp
        };

        try {
          await axios.post(process.env.A7PRO_HOST + '/api/special/order', {
            client_id: client_id,
            client_detail: JSON.stringify(client_detail),
            kategori_pekerjaan_id: kategori_pekerjaan_id,
            tipe_ac_id: tipe_ac_id,
            tgl_order: tgl_order,
            alamat: alamat,
            latitude: latitude,
            longitude: longitude
          });
        } catch (error) {
          requestError = true;
        }

        await service.update({
          status: Service.STATUS_RELEASED,
          service_date: tgl_order
        });
      };

      if (requestError) {
        throw new Error("An error occurred while sending request to A7Pro.");
      } else {
        sendSuccessResponse(res, '', "Service order success");
      }
    } catch (error) {
      next(error);
    }
  }

  public async getTipeAc(req: Request, res: Response, next: NextFunction) {
    try {
      let response = await axios.get(process.env.A7PRO_HOST + '/api/special/tipe-ac?paginate=false');
      let tipeacs = response.data.data.data;

      sendSuccessResponse(res, '', tipeacs);
    } catch (error) {
      next(error);
    }
  }

  public async getKategotiPekerjaan(req: Request, res: Response, next: NextFunction) {
    try {
      let response = await axios.get(process.env.A7PRO_HOST + '/api/special/kategori-pekerjaan?paginate=false');
      let kategoris = response.data.data.data;

      sendSuccessResponse(res, '', kategoris);
    } catch (error) {
      next(error);
    }
  }

  public async process(req: Request, res: Response, next: NextFunction) {
    try {
      const service_id = req.body.service_id;

      let service = await Service.findByPk(service_id);

      if (!service) {
        throw new NotFoundError("Service not found.");
      }

      service.update({
        status: Service.STATUS_PROCESS
      });

      sendSuccessResponse(res, '', service);
    } catch (error) {
      next(error);
    }
  }

  public async complete(req: Request, res: Response, next: NextFunction) {
    try {
      const service_id = req.body.service_id;

      let service = await Service.findByPk(service_id);

      if (!service) {
        throw new NotFoundError("Service not found.");
      }

      service.update({
        status: Service.STATUS_COMPLETE
      });

      sendSuccessResponse(res, '', service);
    } catch (error) {
      next(error);
    }
  }

  public async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const service_ids: [] = req.body.service_id;

      await Service.update({
        status: Service.STATUS_FINISH
      }, {
        where: {
          id: {
            [Op.in]: service_ids
          }
        }
      });

      sendSuccessResponse(res, service_ids.length + " service finished.", null);
    } catch (error) {
      next(error);
    }
  }
}

export default new ServiceController();