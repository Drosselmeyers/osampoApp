const express = require("express");
// const { requireLogin } = require("../middlewares/auth.middlewares");

function createBingoRouter(bingoController) {
  const router = express.Router();

  /* 全てのbingoPanelの取得 */
  router.get("/bingo", bingoController.getAllBingoPanel);
  /* bingoPanelの状態を保存 */
  router.patch("/bingo/:bingoId", bingoController.patchBingoStatus);
  /* 全てのbingoPanelの状態をリセット */
  router.patch("/bingo", bingoController.resetBingoStatus);
  return router;
}

module.exports = { createBingoRouter };
