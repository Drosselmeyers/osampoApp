function createPostRepository(knex, table = "posts") {
  const findAll = async () => {
    return await knex(table)
      .join("users", "posts.user_id", "users.uid")
      .select(
        "posts.id",
        "posts.user_id",
        "posts.image_url",
        "posts.caption",
        "posts.created_at",
        "posts.updated_at",
        "users.email as user_email",
      )
      .orderBy("posts.created_at", "desc");
  };

  const findByUserId = async (userId) => {
    return await knex(table)
      .where({ user_id: userId })
      .orderBy("created_at", "desc");
  };

  const findById = async (id) => {
    return await knex(table).where({ id }).first();
  };

  const create = async (userId, imageUrl, caption) => {
    const [post] = await knex(table)
      .insert({
        user_id: userId,
        image_url: imageUrl,
        caption: caption,
      })
      .returning("*");
    return post;
  };

  const deleteById = async (id) => {
    return await knex(table).where({ id }).del();
  };

  return {
    findAll,
    findByUserId,
    findById,
    create,
    deleteById,
  };
}

module.exports = { createPostRepository };
