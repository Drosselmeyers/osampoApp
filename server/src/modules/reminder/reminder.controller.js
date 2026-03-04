function createReminderController(service) {
  
  // リマインダー情報取得
  const getReminder = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const result = await service.getReminder(user_id);
      
      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // リマインダー設定/更新
  const setReminder = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const result = await service.setReminder(user_id);
      
      if (result.ok) {
        res.status(200).json({ data: result.data, message: result.message });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // リマインダー削除
  const deleteReminder = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const result = await service.deleteReminder(user_id);
      
      if (result.ok) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  return { 
    getReminder, 
    setReminder, 
    deleteReminder 
  };
}

module.exports = { createReminderController };