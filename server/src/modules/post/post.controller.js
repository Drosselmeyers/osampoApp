function createPostController(postService) {
  const getAllPosts = async (req, res) => {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createPost = async (req, res) => {
    try {
      const { image_url, caption } = req.body;
      const { uid } = req.user;

      if (!caption) {
        return res.status(400).json({ error: "captionは必須です" });
      }

      const post = await postService.createPost(uid, image_url, caption);
      res.status(201).json(post);
    } catch (error) {
      if (error.message === "ユーザが見つかりません") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };

  const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { uid } = req.user;

      await postService.deletePost(id, uid);
      res.status(204).send();
    } catch (error) {
      if (error.message === "投稿が見つかりません") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "認証エラー") {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };

  const getMyPosts = async (req, res) => {
    try {
      const { uid } = req.user;
      const posts = await postService.getPostsByUserId(uid);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return {
    getAllPosts,
    createPost,
    deletePost,
    getMyPosts,
  };
}

module.exports = { createPostController };
