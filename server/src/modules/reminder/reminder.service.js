function createReminderService(reminderRepository, profileRepository) {
  
  // リマインドが必要かチェック
  const shouldRemind = async (user_id) => {
    // リマインダーが存在しない or 無効ならリマインド不要
    const reminder = await reminderRepository.findByUserId(user_id);
    if (!reminder || !reminder.is_active) {
      return { ok: false, shouldRemind: false };
    }
    
    // プロフィールが存在しないならリマインド不要
    const profile = await profileRepository.findByUserId(user_id);
    if (!profile) {
      return { ok: false, shouldRemind: false };
    }
    
    const now = new Date();
    const baseTime = new Date(reminder.base_time);
    const diffInDays = (now - baseTime) / (1000 * 60 * 60 * 24); // 1000ミリ秒で保存されているため、必要
    
    return { 
      ok: true, 
      shouldRemind: diffInDays >= profile.frequency,
      data: {
        user_id,
        displayname: profile.displayname,
        frequency: profile.frequency,
        base_time: reminder.base_time,
        days_since_last: diffInDays,
      }
    };
  };

  // リマインダー取得
  const getReminder = async (user_id) => {
    const reminder = await reminderRepository.findByUserId(user_id);
    if (!reminder) {
      return {
        ok: false,
        status: 404,
        message: "リマインダーが見つかりません",
      };
    }
    
    // shouldRemindを計算
    const shouldRemindResult = await shouldRemind(user_id);
    
    return {
      ok: true,
      data: {
        ...reminder,
        shouldRemind: shouldRemindResult.shouldRemind,
      },
      message: "リマインダーを取得しました",
    };
  };
  
  // リマインダー設定/更新（upsert）
  const setReminder = async (user_id) => {
    const reminder = await reminderRepository.upsert(user_id);
    
    return {
      ok: true,
      data: reminder,
      message: "リマインダーを設定しました",
    };
  };

  // リマインダー削除
  const deleteReminder = async (user_id) => {
    await reminderRepository.deleteReminder(user_id);
    return {
      ok: true,
      message: "リマインダーを削除しました",
    };
  };
  
  return { 
    shouldRemind,
    getReminder,
    setReminder,
    deleteReminder,
  };
}

module.exports = { createReminderService };