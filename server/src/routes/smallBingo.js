const express = require("express");
// const { requireLogin } = require("../middlewares/auth.middlewares");

function createSmallBingoRouter(smallBingoController) {
  const router = express.Router();

  /* 全てのSmallBingoPanelの取得 */
  router.get("/smallBingo", smallBingoController.getAllSmallBingoPanel);
  /* SmallBingoPanelの状態を保存 */
  router.patch(
    "/smallBingo/:smallBingoId",
    smallBingoController.patchSmallBingoStatus,
  );
  /* 全てのSmallBingoPanelの状態をリセット */
  router.patch("/smallBingo", smallBingoController.resetSmallBingoStatus);
  return router;
}

module.exports = { createSmallBingoRouter };
