function createTimerService(repository) {
  const searchTimer = async (userId) => {
    return repository.searchTimer(userId);
  };
  const createPostUserTimer = async (userId, body) => {
    return repository.createPostUserTimer(userId, body);
  };
  const patchUserTimer = async (timerId, body) => {
    return repository.patchUserTimer(timerId, body);
  };

  return { searchTimer, createPostUserTimer, patchUserTimer };
}

module.exports = { createTimerService };
