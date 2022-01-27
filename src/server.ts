import { createExpressServer } from "routing-controllers";
// import glob from "glob";

import config from "./config";

const PORT = 4000;

console.info(`Starting server on http://localhost:${PORT}`);

// const routes = [];

// const controllerPaths = glob.sync(`${config.rootPath}/controllers/*.js`);
// controllerPaths.forEach((controllerPath) => {
//   const controller = require(controllerPath).default;
//   routes.push(controller);
// });

const app = createExpressServer({
  //   controllers: routes,
  controllers: [`${config.rootPath}/controllers/*.js`],
});

app.listen(PORT);
