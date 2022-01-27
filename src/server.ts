import {
  createExpressServer,
  RoutingControllersOptions,
} from "routing-controllers";
// import glob from "glob";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";

import config, { ServerEnvironments } from "./config";

const PORT = 4000;

console.info(`Starting server on http://localhost:${PORT}`);

// const routes = [];

// const controllerPaths = glob.sync(`${config.rootPath}/controllers/*.js`);
// controllerPaths.forEach((controllerPath) => {
//   const controller = require(controllerPath).default;
//   routes.push(controller);
// });

const routingControllerOptions: RoutingControllersOptions = {
  //   controllers: routes,
  controllers: [`${config.rootPath}/controllers/*.js`],
};

const app = createExpressServer(routingControllerOptions);

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
      },
    },
  });

  console.log("swagger schema", JSON.stringify(spec, null, 3));

  app.use("/explorer", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
}

// general error handing setup
app.use((error, req, res, next) => {
  const status = error.httpErrorCode || 500;
  res.status(status);

  if (config.environment !== ServerEnvironments.PRODUCTION) {
    // ensures error object gets all details
    const jsonString = JSON.stringify(error, (key, value) => {
      if (value instanceof Error) {
        // eslint-disable-next-line no-shadow
        const error = {};

        // eslint-disable-next-line no-shadow
        Object.getOwnPropertyNames(value).forEach((key) => {
          error[key] = value[key];
        });

        return error;
      }

      return value;
    });
    const jsonObject = JSON.parse(jsonString);
    res.send({
      ...jsonObject,
    });
    return;
  }

  res.json({
    status,
    message: error.message,
  });
});

app.listen(PORT);
