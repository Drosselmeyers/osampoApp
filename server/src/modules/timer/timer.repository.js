function createTimerRepository(knex, table = "timer") {
  const searchTimer = async (userId) => {
    return await knex(table).where("user_id", userId);
  };
  const createPostUserTimer = async (userId, body) => {
    await knex(table).insert({
      user_id: userId,
      time: body.time,
    });
  };
  const patchUserTimer = async (timerId, body) => {
    return await knex("timer")
      .where("timer_id", timerId)
      .update({ time: body.time })
      .returning("*");
  };

  return { searchTimer, createPostUserTimer, patchUserTimer };
}
module.exports = { createTimerRepository };
