import {
  createExpressServer,
  RoutingControllersOptions,
  getMetadataArgsStorage,
} from "routing-controllers";
import "reflect-metadata";
// import glob from "glob";
import { Application as ExpressServer } from "express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import compression from "compression";

import config, { ServerEnvironments } from "./config";
import * as MiddleWares from "./global-middlewares";

const PORT = 4000;

console.info(`Starting server on http://localhost:${PORT}`);

// const routes = [];

// const controllerPaths = glob.sync(`${config.rootPath}/controllers/*.js`);
// controllerPaths.forEach((controllerPath) => {
//   const controller = require(controllerPath).default;
//   routes.push(controller);
// });

const middlewareImports = Object.values(MiddleWares);

const routingControllerOptions: RoutingControllersOptions = {
  //   controllers: routes,
  controllers: [`${config.rootPath}/controllers/*.controller.js`],
  middlewares: [...middlewareImports],
  classTransformer: true,
  defaultErrorHandler: false,
};

const app = createExpressServer(routingControllerOptions) as ExpressServer;

if (config.environment !== ServerEnvironments.PRODUCTION) {
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllerOptions, {
    info: {
      title: "Routing Controllers Learning",
      description: "A simple project to learn how to use routing controllers.",
      version: "1.0.0",
    },
    components: {
      schemas: {
        HeartBeatResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "A nice welcome message from my favorite Frenchman.",
            },
          },
        },
        ConvertTimeRequest: {
          type: "object",
          properties: {
            isoDateTimeString: {
              type: "string",
              description: "ISO UTC date string.",
            },
            timeZone: {
              type: "string",
              description: "Moment TZ time zone string.",
            },
          },
        },
        SystemUserMutable: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "Username.",
            },
            email: {
              type: "string",
              description: "User's email.",
            },
            password: {
              type: "string",
              description: "User's password.",
              format: "password",
            },
            isAdmin: {
              type: "boolean",
            },
            emailConfirmed: {
              type: "boolean",
            },
          },
        },
        PostMutable: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            content: {
              type: "string",
            },
            authorId: {
              type: "string",
            },
          },
        },
      },
    },
  });

  console.log("swagger schema", JSON.stringify(spec, null, 3));

  app.use("/explorer", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
}

app.use(compression());

app.listen(PORT);
console.info(`Started server on http://localhost:${PORT}`);
