const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  return app;
}

module.exports = { buildApp };
