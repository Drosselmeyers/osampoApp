function createSmallBingoController(service) {
  const getAllSmallBingoPanel = async (_, res) => {
    try {
      const allSmallBingoPanel = await service.getAllSmallBingoPanel();
      return res.json(allSmallBingoPanel);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  const patchSmallBingoStatus = async (req, res) => {
    const smallBingoId = req.params.smallBingoId;
    try {
      const getPatchPanel = await service.patchSmallBingoStatus(smallBingoId);
      return res.send(getPatchPanel);
    } catch (error) {
      return res.status(306).send({ error: error.message });
    }
  };

  const resetSmallBingoStatus = async (_, res) => {
    try {
      const getAllResetSmallBingoStatus = await service.resetSmallBingoStatus();
      return res.send(getAllResetSmallBingoStatus);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  };

  return {
    getAllSmallBingoPanel,
    patchSmallBingoStatus,
    resetSmallBingoStatus,
  };
}

module.exports = { createSmallBingoController };
