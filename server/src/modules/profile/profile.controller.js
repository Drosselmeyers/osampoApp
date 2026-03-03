function createProfileController(service) {
  // 認証ユーザーのプロフィール取得
  const getMe = async (req, res) => {
    try {
      const user_id = req.user.uid;
      const result = await service.getProfile(user_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // プロフィール取得
  const getProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await service.getProfile(user_id);

      if (result.ok) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // プロフィール作成
  const createProfile = async (req, res) => {
    try {
      const { user_id, displayname, frequency } = req.body;
      const result = await service.createProfile(user_id, displayname, frequency);

      if (result.ok) {
        res.status(201).json({ data: result.data, message: result.message });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // プロフィール更新
  const updateProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { displayname, frequency } = req.body;
      const result = await service.updateProfile(user_id, displayname, frequency);

      if (result.ok) {
        res.status(200).json({ data: result.data, message: result.message });
      } else {
        res.status(result.status).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // プロフィール削除
  const deleteProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await service.deleteProfile(user_id);

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
    getMe,
    getProfile, 
    createProfile, 
    updateProfile, 
    deleteProfile 
  };
}

module.exports = { createProfileController };