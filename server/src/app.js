const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");
const { initProfile } = require("./modules/profile/index");
const { createProfilesRouter } = require("./routes/profile");
const { initPost } = require("./modules/post/index");
const { createPostRouter } = require("./routes/post");
const { initReminder } = require("./modules/reminder/index");
const { createRemindersRouter } = require("./routes/reminder");
const { initBingo } = require("./modules/bingo/index");
const { createBingoRouter } = require("./routes/bingo");
const { initSmallBingo } = require("./modules/smallBingo");
const { createSmallBingoRouter } = require("./routes/smallBingo");
const { initTimer } = require("./modules/timer/index");
const { createTimerRouter } = require("./routes/timer");

function buildApp() {
  const app = express();

  app.use(express.json());
  /* staticファイルの位置を指定 */
  app.use("/", express.static(path.join(__dirname, "../public")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  const profileController = initProfile(knex);
  app.use("/api", createProfilesRouter(profileController));

  const reminderController = initReminder(knex);
  app.use("/api", createRemindersRouter(reminderController));

  const postController = initPost(knex);
  app.use("/api", createPostRouter(postController));

  const bingoController = initBingo(knex);
  app.use("/api", createBingoRouter(bingoController));

  const smallBingoController = initSmallBingo(knex);
  app.use("/api", createSmallBingoRouter(smallBingoController));

  const timerController = initTimer(knex);
  app.use("/api", createTimerRouter(timerController));

  // SPAフォールバック: すべてのAPI以外のルートをindex.htmlに
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  return app;
}

module.exports = { buildApp };
