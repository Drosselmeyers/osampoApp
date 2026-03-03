function createTimerController(service) {
  const createPostUserTimer = async (req, res) => {
    const userId = req.params.userId;
  };

  const patchUserTimer = async (req, res) => {
    const userId = req.params.userId;
  };

  const resetUserTimer = async () => {
    const userId = req.params.userId;
    try {
    } catch (error) {}
  };

  return { createPostUserTimer, patchUserTimer, resetUserTimer };
}

module.exports = { createTimerController };
