function createReminderService(reminderRepository, profileRepository) {
  
  // リマインドが必要かチェック
  const shouldRemind = async (user_id) => {
    const reminder = await reminderRepository.findByUserId(user_id);
    if (!reminder || !reminder.is_active) {
      return { ok: false, shouldRemind: false };
    }
    
    const profile = await profileRepository.findByUserId(user_id);
    if (!profile) {
      return { ok: false, shouldRemind: false };
    }
    
    const now = new Date();
    const baseTime = new Date(reminder.base_time);
    const diffInDays = (now - baseTime) / (1000 * 60 * 60 * 24);
    
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
    return {
      ok: true,
      data: reminder,
      message: "リマインダーを取得しました",
    };
  };
  
  // リマインダー作成
  const createReminder = async (user_id) => {
    const existing = await reminderRepository.findByUserId(user_id);
    if (existing) {
      return {
        ok: false,
        status: 400,
        message: "リマインダーは既に設定されています",
      };
    }
    
    const reminder = await reminderRepository.create(user_id);
    return {
      ok: true,
      data: reminder,
      message: "リマインダーを設定しました",
    };
  };
  
  return { 
    shouldRemind,
    getReminder,
    createReminder 
  };
}

module.exports = { createReminderService };