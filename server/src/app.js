const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");
const {initProfile} = require("./modules/profile/index");
const {createProfilesRouter} = require("./routes/profile");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  const profileController = initProfile(knex);
  app.use("/api", createProfilesRouter(profileController));

  return app;
}

module.exports = { buildApp };
