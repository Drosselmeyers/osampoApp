const express = require("express");
// const { requireLogin } = require("../middlewares/auth.middlewares");

function createTimerRouter(timerController) {
  const router = express.Router();

  router.get("/timer/:userId", timerController.searchTimer);

  router.post("/timer/:userId", timerController.createPostUserTimer);

  router.patch("/timer/:timerId", timerController.patchUserTimer);
  return router;
}

module.exports = { createTimerRouter };
