const express = require('express');
const { verifyToken } = require("../middlewares/auth.middlewares");

function createRemindersRouter(remindersController) {
  const router = express.Router();

  // リマインダー関連のCRUD操作
  // リマインダー取得
  router.get('/reminders', verifyToken, remindersController.getReminder);
  // リマインダー設定/更新（upsert）
  router.post('/reminders', verifyToken, remindersController.setReminder);
  // リマインダー削除
  router.delete('/reminders', verifyToken, remindersController.deleteReminder);

  return router;
}

module.exports = { createRemindersRouter };