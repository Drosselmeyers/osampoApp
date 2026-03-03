function createPostService(postRepository, userRepository) {
  const getAllPosts = async () => {
    return await postRepository.findAll();
  };

  const getPostsByUserId = async (userId) => {
    return await postRepository.findByUserId(userId);
  };

  const createPost = async (uid, imageUrl, caption) => {
    const user = await userRepository.findByUid(uid);
    // 登録済みuserしか投稿できない
    if (!user) {
      throw new Error("ユーザが見つかりません");
    }
    return await postRepository.create(user.uid, imageUrl, caption);
  };

  const deletePost = async (postId, uid) => {
    // 登録済みuserしか削除できない
    const user = await userRepository.findByUid(uid);
    if (!user) {
      throw new Error("ユーザが見つかりません");
    }

    const post = await postRepository.findById(postId);
    if (!post) {
      throw new Error("投稿が見つかりません");
    }

    // 自分の投稿以外は削除できない
    if (post.user_id !== user.uid) {
      throw new Error("認証エラー");
    }

    return await postRepository.deleteById(postId);
  };

  return {
    getAllPosts,
    getPostsByUserId,
    createPost,
    deletePost,
  };
}

module.exports = { createPostService };
