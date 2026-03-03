const express = require('express');
const { verifyToken } = require("../middlewares/auth.middlewares");

function createRemindersRouter(remindersController) {
  const router = express.Router();

  // 認証ユーザーの情報取得
  router.get("/auth/me", verifyToken, remindersController.getMe);

  // リマインダー関連のCRUD操作
  // リマインダー取得
  router.get('/reminders/:user_id', remindersController.getReminder);
  // リマインダー作成
  router.post('/reminders/:user_id', remindersController.createReminder);
  // リマインダー更新
  router.put('/reminders/:user_id', remindersController.updateReminder);
  // リマインダー削除
  router.delete('/reminders/:user_id', remindersController.deleteReminder);

  return router;
}

module.exports = { createRemindersRouter };