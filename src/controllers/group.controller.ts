import e, { Request, Response, NextFunction } from "express";
import Group from "../models/group";
import { sendSuccessResponse, sendErrorResponse } from "../helpers/response";

interface GroupForm {
  company_id: number;
  parent_id: number;
  name: string;
  tel: string;
  address: string;
  latitude: number;
  longitude: number;
}

class GroupController {
  public async getInduk(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    let criteria = {
      company_id: company_id,
      level: 1,
    };

    try {
      let groups = await Group.findAll({
        where: criteria,
      });

      sendSuccessResponse(res, "", groups);
    } catch (error) {
      next(error);
    }
  }

  public async showInduk(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let group = await Group.findByPk(id);

      if (!group) {
        throw new Error("Group not found.");
      }

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async getSubInduk(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    let criteria: { [k: string]: any } = {
      company_id: company_id,
      level: 2,
    };

    const { induk_id } = req.query;
    if (induk_id) {
      criteria.parent_id = induk_id;
    }

    try {
      let groups = await Group.findAll({
        where: criteria,
        include: [
          {
            association: Group.associations.parent,
          },
        ],
      });

      sendSuccessResponse(res, "", groups);
    } catch (error) {
      next(error);
    }
  }

  public async showSubInduk(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let group = await Group.findByPk(id, {
        include: [
          {
            association: Group.associations.parent,
          },
        ],
      });

      if (!group) {
        throw new Error("Group not found.");
      }

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async getEquipment(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    let criteria: { [k: string]: any } = {
      company_id: company_id,
      level: 3,
    };

    const { subinduk_id } = req.query;
    if (subinduk_id) {
      criteria.parent_id = subinduk_id;
    }

    try {
      let groups = await Group.findAll({
        where: criteria,
        include: [
          {
            association: Group.associations.parent,
            include: [
              {
                association: Group.associations.parent,
              },
            ],
          },
        ],
      });

      sendSuccessResponse(res, "", groups);
    } catch (error) {
      next(error);
    }
  }

  public async showEquipment(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let group = await Group.findByPk(id, {
        include: [
          {
            association: Group.associations.parent,
            include: [
              {
                association: Group.associations.parent,
              },
            ],
          },
        ],
      });

      if (!group) {
        throw new Error("Group not found.");
      }

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async createInduk(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    const { name, tel, address, latitude, longitude } = req.body;

    try {
      let group = await Group.create<Group>({
        company_id: company_id,
        name: name,
        tel: tel,
        level: 1,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async createSubInduk(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    try {
      if (!(parent_id && address && latitude && longitude)) {
        throw new Error("All data must be specified.");
      }

      let group = await Group.create<Group>({
        company_id: company_id,
        parent_id: parent_id,
        name: name,
        tel: tel,
        level: 2,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (error) {
      next(error);
    }
  }

  public async createEquipment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const company_id = (req.user as any).company_id;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    try {
      if (!parent_id) {
        throw new Error("All data must be specified.");
      }

      let group = await Group.create<Group>({
        company_id: company_id,
        parent_id: parent_id,
        name: name,
        tel: tel,
        level: 3,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (error) {
      next(error);
    }
  }

  public async updateInduk(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { name, tel, address, latitude, longitude } = req.body;

    try {
      let group = await Group.findByPk(id);

      if (!group) {
        throw new Error("Group not found.");
      }

      group.update({
        name: name,
        tel: tel,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async updateSubInduk(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    try {
      if (!(parent_id && address && latitude && longitude)) {
        throw new Error("All data must be specified.");
      }

      let group = await Group.findByPk(id);

      if (!group) {
        throw new Error("Group not found.");
      }

      group.update({
        parent_id: parent_id,
        name: name,
        tel: tel,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async updateEquipment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    try {
      if (!parent_id) {
        throw new Error("All data must be specified.");
      }

      let group = await Group.findByPk(id);

      if (!group) {
        throw new Error("Group not found.");
      }

      group.update({
        parent_id: parent_id,
        name: name,
        tel: tel,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      sendSuccessResponse(res, "", group);
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let group = await Group.findByPk(id);

      if (!group) {
        throw new Error("Group not found.");
      }

      await group.destroy();

      sendSuccessResponse(res, "");
    } catch (err) {
      next(err);
    }
  }
}

export default new GroupController();
