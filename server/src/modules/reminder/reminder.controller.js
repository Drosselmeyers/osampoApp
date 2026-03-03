function createReminderController(service) {
  
  // リマインダー情報取得
  const getReminder = async (req, res) => {
    try {
      const user_id = req.user.uid;
      
      const result = await service.getReminder(user_id);
      
      // 3. HTTPレスポンスを返す
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // リマインダー作成
  const createReminder = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const result = await service.createReminder(user_id);
      
      if (result.ok) {
        res.status(201).json({ data: result.data, message: result.message });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  return { getReminder, createReminder };
}

module.exports = { createReminderController };