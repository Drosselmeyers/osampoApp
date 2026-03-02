const express = require('express');
const { verifyToken } = require("../middlewares/auth.middlewares");

function createProfilesRouter(profilesController) {
  const router = express.Router();

  // 認証ユーザーの情報取得
  router.get("/auth/me", verifyToken, profilesController.getMe);

  // プロフィール関連のCRUD操作
  // プロフィール取得
  router.get('/profiles/:user_id', verifyToken, profilesController.getProfile);
  // プロフィール作成
  router.post('/profiles', verifyToken, profilesController.createProfile);
  // プロフィール更新
  router.put('/profiles/:user_id', verifyToken, profilesController.updateProfile);
  // プロフィール削除
  router.delete('/profiles/:user_id', verifyToken, profilesController.deleteProfile);

  return router;
}

module.exports = { createProfilesRouter };