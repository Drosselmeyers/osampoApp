const express = require("express");
const { requireLogin } = require("../middlewares/auth.middlewares");

function createPostRouter(postController) {
  const router = express.Router();

  // 全ユーザのすべての投稿を取得
  router.get("/posts", postController.getAllPosts);

  // 自分の投稿のみ取得
  router.get("/posts/me", requireLogin, postController.getMyPosts);

  // 投稿を作成
  router.post("/posts", requireLogin, postController.createPost);

  // 投稿を削除
  router.delete("/posts/:id", requireLogin, postController.deletePost);

  return router;
}

module.exports = { createPostRouter };
