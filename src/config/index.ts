/* eslint-disable global-require */

const path = require("path");

const rootPath = path.normalize(`${__dirname}/..`);

const config = {
  rootPath,
};

Object.seal(rootPath);

export default config;
