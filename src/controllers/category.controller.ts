import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import Category from "../models/category";

class CategoryController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    let criteria = {
      company_id: company_id,
    };

    try {
      let categories = await Category.findAll({
        where: criteria,
      });

      sendSuccessResponse(res, "", categories);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const company_id = (req.user as any).company_id;
    const { name } = req.body;

    try {
      let category = await Category.create({
        company_id: company_id,
        name: name,
      });

      sendSuccessResponse(res, "", category);
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let category = await Category.findByPk(id);

      if (!category) {
        throw new Error("Category not found.");
      }

      sendSuccessResponse(res, "", category);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { name } = req.body;

    try {
      let category = await Category.findByPk(id);

      if (!category) {
        throw new Error("Category not found.");
      }

      category.update({
        name: name,
      });

      sendSuccessResponse(res, "", category);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      let category = await Category.findByPk(id);

      if (!category) {
        throw new Error("Category not found.");
      }

      await category.destroy();

      sendSuccessResponse(res, "");
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
