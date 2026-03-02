const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");
const { initPost } = require("./modules/post/index");
const { createPostRouter } = require("./routes/post");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  const postController = initPost(knex);
  app.use("/api", createPostRouter(postController));

  return app;
}

module.exports = { buildApp };
