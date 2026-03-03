function createBingoController(service) {
  const getAllBingoPanel = async (_, res) => {
    try {
      const allBingoPanel = await service.getAllBingoPanel();
      return res.json(allBingoPanel);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  const patchBingoStatus = async (req, res) => {
    const bingoId = req.params.bingoId;
    try {
      const getPatchPanel = await service.patchBingoStatus(bingoId);
      return res.send(getPatchPanel);
    } catch (error) {
      return res.status(306).send({ error: error.message });
    }
  };

  const resetBingoStatus = async (_, res) => {
    try {
      const getAllResetBingoStatus = await service.resetBingoStatus();
      return res.send(getAllResetBingoStatus);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  };

  return { getAllBingoPanel, patchBingoStatus, resetBingoStatus };
}

module.exports = { createBingoController };
