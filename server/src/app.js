const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");
const { initProfile } = require("./modules/profile/index");
const { createProfilesRouter } = require("./routes/profile");
const { initPost } = require("./modules/post/index");
const { createPostRouter } = require("./routes/post");
const { initBingo } = require("./modules/bingo/index");
const { createBingoRouter } = require("./routes/bingo");
const { time } = require("console");

function buildApp() {
  const app = express();

  app.use(express.json());
  /* staticファイルの位置を指定 */
  app.use("/", express.static(path.join(__dirname, "../public")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  const profileController = initProfile(knex);
  app.use("/api", createProfilesRouter(profileController));

  const postController = initPost(knex);
  app.use("/api", createPostRouter(postController));
  const bingoController = initBingo(knex);
  app.use("/api", createBingoRouter(bingoController));

  app.post("/api/timer/:userId", async (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    await knex("timer").insert({
      user_id: userId,
      time: `${body.hour}:${body.minute}:${body.second}`,
    });
    return res.send({ message: "post" });
  });
  app.get("/api/timer/:userId", async (req, res) => {
    const userId = req.params.userId;
    const targetTimer = await knex("timer").where("user_id", userId);
    return res.send(targetTimer);
  });
  app.patch("/api/timer/:timerId", async (req, res) => {
    const timerId = req.params.timerId;
    const body = req.body;
    const patchTimer = await knex("timer")
      .where("timer_id", timerId)
      .update({ time: `${body.hour}:${body.minute}:${body.second}` })
      .returning("*");
    return res.send(patchTimer);
  });
  // SPAフォールバック: すべてのAPI以外のルートをindex.htmlに
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  return app;
}

module.exports = { buildApp };
