const { createPostRepository } = require("./post.repository");
const { createPostService } = require("./post.service");
const { createPostController } = require("./post.controller");
const { createUserRepository } = require("../user/user.repository");

function initPost(knex) {
  const postRepository = createPostRepository(knex);
  const userRepository = createUserRepository(knex);
  const postService = createPostService(postRepository, userRepository);
  const postController = createPostController(postService);

  return postController;
}

module.exports = { initPost };
