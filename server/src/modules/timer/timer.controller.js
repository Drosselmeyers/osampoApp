function createTimerController(service) {
  const searchTimer = async (req, res) => {
    try {
      const userId = req.params.userId;
      const body = req.body;
      const targetTimer = await service.searchTimer(userId, body);
      return res.send(targetTimer);
    } catch (error) {
      return res.status(306).send({ message: error.message });
    }
  };
  const createPostUserTimer = async (req, res) => {
    try {
      const userId = req.params.userId;
      const body = req.body;
      await service.createPostUserTimer(userId, body);
      return res.send({ message: "postTimer" });
    } catch (error) {
      return res.status(306).send({ message: error.message });
    }
  };

  const patchUserTimer = async (req, res) => {
    try {
      const timerId = req.params.timerId;
      const body = req.body;
      await service.patchUserTimer(timerId, body);
      return res.send({ message: "patch" });
    } catch (error) {
      return res.send({ message: error.message });
    }
  };

  return { searchTimer, createPostUserTimer, patchUserTimer };
}

module.exports = { createTimerController };
