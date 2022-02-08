# Routing Controllers Learing

This repo is meant for me to learn how to modernize my standard Web API approach.

## Package Mgmt

This will be using Yarn as that seems to account for the possibility of packages going missing in NPM.

Read more @ https://yarnpkg.com/getting-started/install

Note: Had to fallback to `node_modules` based Yarn due to issues with Prisma ORM build process with Yarn Zero Install / Plug N Play approach. 

### Node.js >=16.10

Corepack is included by default with all Node.js installs, but is currently opt-in. To enable it, run the following command:

```
corepack enable
```

### Node.js <16.10

Corepack isn't included with Node.js in versions before the 16.10; to address that, run:

```
npm i -g corepack
```

## Pre-commit Hook

Using option 2 @ https://prettier.io/docs/en/precommit.html.

## Resources

1. https://webdevetc.com/blog/guide-to-routing-controllers/#returning-json-from-your-controller
2. https://developer.okta.com/blog/2018/11/15/node-express-typescript
