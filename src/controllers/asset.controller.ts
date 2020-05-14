import { Request, Response, NextFunction } from "express";
import * as csv from "fast-csv";
import moment from "moment";
import { sendSuccessResponse } from "../helpers/response";
import Asset from "../models/asset";
import { NotFoundError } from "../helpers/error";
import Group from "../models/group";
import Service from "../models/service";
import { Op } from "sequelize";
import Type from "../models/type";
import GrowthType from "../models/growthType";
import Class from "../models/class";
import ConsumptionType from "../models/consumptionType";

class AssetController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;

    try {
      let assets = await Asset.findAll({
        attributes: [
          "id",
          "name",
          "growth_rate",
          "manufacturer",
          "capacity",
          "capacity_unit",
          "serial_number",
          "price",
          "manufacture_date",
          "installation_date",
          "custom_fields",
          "service_plan",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            association: Asset.associations.group,
            where: {
              company_id: company_id,
            },
            include: [
              {
                association: Group.associations.parent,
                include: [
                  {
                    association: Group.associations.parent,
                  },
                ]
              }
            ]
          },
          {
            association: Asset.associations.type,
          },
          {
            association: Asset.associations.category,
          },
          {
            association: Asset.associations.class,
          },
          {
            association: Asset.associations.consumption_type,
          },
          {
            association: Asset.associations.growth_type,
          },
        ],
        where: {},
      });

      sendSuccessResponse(res, "", assets);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const params = req.body;

    try {
      let asset = await Asset.create({
        group_id: params.group_id,
        name: params.name,
        type_id: params.type_id,
        growth_type_id: params.growth_type_id,
        growth_rate: params.growth_rate,
        class_id: params.class_id,
        consumption_type_id: params.consumption_type_id,
        category_id: params.category_id,
        manufacturer: params.manufacturer,
        capacity: params.capacity,
        capacity_unit: params.capacity_unit,
        serial_number: params.serial_number,
        price: params.price,
        manufacture_date: params.manufacture_date,
        installation_date: params.installation_date,
        custom_fields: params.custom_fields,
        service_plan: {
          start_date: params.start_date,
          long: params.long,
          periodic: params.periodic
        }
      });

      return sendSuccessResponse(res, "", asset);
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let asset = await Asset.findByPk(id, {
        attributes: [
          "id",
          "name",
          "growth_rate",
          "manufacturer",
          "capacity",
          "capacity_unit",
          "serial_number",
          "price",
          "manufacture_date",
          "installation_date",
          "custom_fields",
          "service_plan",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            association: Asset.associations.group,
            include: [
              {
                association: Group.associations.parent,
                include: [
                  {
                    association: Group.associations.parent,
                  },
                ]
              }
            ]
          },
          {
            association: Asset.associations.type,
          },
          {
            association: Asset.associations.category,
          },
          {
            association: Asset.associations.class,
          },
          {
            association: Asset.associations.consumption_type,
          },
          {
            association: Asset.associations.growth_type,
          },
        ],
      });

      if (!asset) {
        throw new NotFoundError("Asset not found.");
      }

      sendSuccessResponse(res, "", asset);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const params = req.body;

    try {
      let asset = await Asset.findByPk(id);

      if (!asset) {
        throw new NotFoundError("Asset not found.");
      }

      asset.update(params);

      sendSuccessResponse(res, "", asset);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let asset = await Asset.findByPk(id);

      if (!asset) {
        throw new NotFoundError("Asset not found.");
      }

      await asset.destroy();

      sendSuccessResponse(res, "");
    } catch (error) {
      next(error);
    }
  }

  public async setServicePlan(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { start_date, long, periodic } = req.body;

    try {
      let asset = await Asset.findByPk(id, {
        include: [
          {
            association: Asset.associations.services
          }
        ]
      });
      
      if (!asset) {
        throw new NotFoundError("Asset not found.");
      }

      asset.update({
        service_plan: {
          start_date: start_date,
          long: long,
          periodic: periodic,
        },
      });
      
      let services = asset.services;
      let now = moment();

      for (let service of services!) {
        if (now.isSameOrBefore(moment(service.end_date)) && service.status == 0) {
          await service.destroy();
        }
      }

      let edate = moment(start_date).add(long - 1, 'days');

      asset.createService({
        asset_id: asset.id,
        start_date: start_date,
        end_date: edate.format('YYYY-MM-DD')
      });

      sendSuccessResponse(res, "", asset);
    } catch (error) {
      next(error);
    }
  }

  public async getCsvTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      let types = await Type.findAll({ raw: true });
      let growth_types = await GrowthType.findAll({ raw: true });
      let classes = await Class.findAll({ raw: true });
      let consumption_types = await ConsumptionType.findAll({ raw: true });
      let custom_fields = [
        "key 1 = val 1; key 2 = val 2;",
        "warna = kuning; panjang = 1 meter"
      ];

      let max = Math.max(types.length, growth_types.length, classes.length, consumption_types.length);
      
      let guide = [];
      let guide_header = [
        "ID", "Tipe Aset", "", "ID", "Jenis Part", "", "ID", "Kelas Aset", "", "ID", "Konsumsi Aset", "",
        "Data Tambahan", "", "", ""
      ];

      let header = [
        'ID Equipment', 'Nama Aset', 'Tipe Aset', 'Jenis Part', 'Growth/Depression Rate', 'Kelas Aset',
        'Konsumsi Aset', 'ID Kategori', 'Pabrikan', 'Kapasitas', 'Satuan Kapasitas', 'Nomor Seri', 'Harga', 
        'Tanggal Pembuatan', 'Tanggal Pemasangan', 'Data Tambahan'
      ];

      for (let i = 0; i < max; i++) {
        let type_id: any = "", type_name: any = "";
        if (types[i] != undefined) {
          type_id = types[i].id;
          type_name = types[i].name
        }

        let growth_id: any = "", growth_name: any = "";
        if (growth_types[i] != undefined) {
          growth_id = growth_types[i].id;
          growth_name = growth_types[i].name;
        }

        let class_id: any = "", class_name: any = "";
        if (classes[i] != undefined) {
          class_id = classes[i].id;
          class_name = classes[i].name;
        }
        
        let consumption_id: any = "", consumption_name: any = "";
        if (consumption_types[i] != undefined) {
          consumption_id = consumption_types[i].id;
          consumption_name = consumption_types[i].name;
        }

        guide.push([
          type_id, type_name,
          "",
          growth_id, growth_name,
          "",
          class_id, class_name,
          "",
          consumption_id, consumption_name,
          "",
          custom_fields[i] != undefined ? custom_fields[i] : ""
        ]);
      }

      res.setHeader('Content-disposition', 'attachment; filename=asset_template.csv');
      res.setHeader('content-type', 'text/csv');
  
      csv.writeToStream(res, [
        guide_header,
        ...guide,
        [],
        header
      ]);
    } catch (error) {
      next(error);
    }
  }

  public async addAssetByCsv(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error('CSV not uploaded');

      let headers = [
        'group_id', 'name', 'type_id', 'growth_type_id', 'growth_rate', 'class_id', 'consumption_type_id',
        'category_id', 'manufacturer', 'capacity', 'capacity_unit', 'serial_number', 'price', 'manufacture_date',
        'installation_date', 'custom_fields'
      ];

      let types = await Type.findAll({ raw: true });
      let growth_types = await GrowthType.findAll({ raw: true });
      let classes = await Class.findAll({ raw: true });
      let consumption_types = await ConsumptionType.findAll({ raw: true });

      let max = Math.max(types.length, growth_types.length, classes.length, consumption_types.length);

      let reader = csv.parseFile(req.file.path, { headers: headers, renameHeaders: true, skipLines: max + 2 });
      let data: object[] = [];
      
      reader.on('error', error => {
        next(error);
      });
  
      reader.on('data', async row => {
        try {
          let customs = row.custom_fields.split(";");
          let custom_fields: { [key: string]: string } = {};

          for (let field of customs) {
            let temp = field.split('=');
            if (temp.length == 2) {
              custom_fields[temp[0].trim()] = temp[1].trim(); 
            }
          }

          row.custom_fields = custom_fields;
          
          data.push(row);
        } catch (error) {
          next(error);
        }
      });
  
      reader.on('end', async (rowCount: number) => {
        try {
          await Asset.bulkCreate(data);
          
          sendSuccessResponse(res, `${rowCount} assets was added`);
        } catch (err) {
          next(err);
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AssetController();
