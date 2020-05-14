import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import passport from "./middlewares/passport";
import { handleError, UnknownError, NotFoundError } from "./helpers/error";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config(): Promise<void> {
    // cors middleware
    this.app.use(cors());

    // bodyparser middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // passport middleware
    this.app.use(passport);

    // apply all routes
    this.applyRoutes();

    // api doc route
    this.handleApiDoc();

    // 404 Not Found middleware
    this.app.use((req, res) => {
      throw new NotFoundError();
    });

    // error handler middleware
    this.app.use(this.errorHandler);
  }

  private applyRoutes() {
    for (const route of routes) {
      const { method, path, handler } = route;
      (this.app as any)[method](path, handler);
    }
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    handleError(res, err);
  }

  private handleApiDoc() {
    const swaggerDocument = YAML.load("src/docs/swagger.yaml");
    this.app.use("/docs", function(req: Request, res: Response, next: NextFunction){
      swaggerDocument.host = req.get('host');
      (req as any).swaggerDoc = swaggerDocument;
      next();
    }, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
