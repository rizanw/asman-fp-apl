import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { injectable, inject } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import "src/ui/http/express/controllers";
import routes from "src/ui/http/express/routes";
import passportMiddleware from "./express/middlewares/passport";
import { IServer } from "src/ui/http/IServer";
import { GetUserService } from "src/application/user/GetUserService";

@injectable()
export class ExpressServer implements IServer {
  protected readonly inversifyExpressServer: InversifyExpressServer;
  protected readonly getUserService: GetUserService;

  constructor(
    @inject(InversifyExpressServer)
    inversifyExpressServer: InversifyExpressServer,
    getUserService: GetUserService
  ) {
    this.inversifyExpressServer = inversifyExpressServer;
    this.getUserService = getUserService;
  }

  public initialize(): void {
    this.inversifyExpressServer.setConfig((app) => {
      this.initializeCors(app);
      this.initializeBodyParser(app);
      this.initializePassport(app);
      this.initializeRoutes(app);
    });
  }

  public initializeCors(app: express.Application) {
    app.use(cors());
  }

  public initializeBodyParser(app: express.Application) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }

  public initializePassport(app: express.Application) {
    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const strategy = new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await this.getUserService.execute(payload.sub);

          if (!user) {
            return done(null, false);
          }

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    );

    passport.use(strategy);
    app.use(passportMiddleware);
  }

  public initializeRoutes(app: express.Application) {
    for (const route of routes) {
      const { method, path, handler } = route;
      (app as any)[method](path, handler);
    }
  }

  public start(): void {
    const PORT = process.env.APP_PORT;
    this.inversifyExpressServer
      .build()
      .listen(PORT, () =>
        console.log(`Server listening on http://localhost:${PORT}`)
      );
  }
}
