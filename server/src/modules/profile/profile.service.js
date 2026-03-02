function createProfileService(repository) {
  // プロフィール取得
  const getProfile = async (user_id) => {
    const profile = await repository.findByUserId(user_id);
    if (!profile) {
      return {
        ok: false,
        status: 400,
        message: "プロフィールを登録してください",
      };
    }

    return { 
      ok: true, 
      data: profile, 
      message: "プロフィールを取得しました" 
    };
  };

  // プロフィール作成
  const createProfile = async (user_id, displayname, frequency) => {
    if (!user_id || !displayname || !frequency) {
      return {
        ok: false,
        status: 400,
        message: "user_id/displayname/frequencyのいずれかが不足しています",
      };
    }

    const profile = await repository.create(user_id, displayname, frequency);
    return { 
      ok: true, 
      data: profile, 
      message: "プロフィールを作成しました" 
    };
  };

  // プロフィール更新
  const updateProfile = async (user_id, displayname, frequency) => {
    if (!user_id || !displayname || !frequency) {
      return {
        ok: false,
        status: 400,
        message: "user_id/displayname/frequencyのいずれかが不足しています",
      };
    }

    const profile = await repository.updateProfile(user_id, displayname, frequency);
    return { 
      ok: true, 
      data: profile, 
      message: "プロフィールを更新しました" 
    };
  };

  // プロフィール削除
  const deleteProfile = async (user_id) => {
    await repository.deleteProfile(user_id);
    return { 
      ok: true, 
      message: "プロフィールを削除しました" 
    };
  };

  return { 
    getProfile, 
    createProfile, 
    updateProfile, 
    deleteProfile 
  };
}

module.exports = { createProfileService };