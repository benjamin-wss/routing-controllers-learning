/* eslint-disable global-require */

const path = require("path");

const rootPath = path.normalize(`${__dirname}/..`);

export enum ServerEnvironments {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export interface ISystemConfig {
  rootPath: string;
  environment: ServerEnvironments;
}

const config = {
  rootPath,
  environment: process.env.NODE_ENV || ServerEnvironments.DEVELOPMENT,
};

Object.seal(rootPath);

export default config;
