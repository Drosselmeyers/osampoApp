import { auth } from "./firebase";

/**
 * Firebase JWT認証トークンを自動的に付与するfetchラッパー
 *
 * フロー：
 * 1. ログイン時にFirebaseサーバーが秘密鍵でJWTを署名・発行
 * 2. JWTはlocalStorageに保存される
 * 3. この関数がlocalStorageからJWTを取得
 * 4. AuthorizationヘッダーにBearerトークンとして付与
 * 5. サーバー側は公開鍵でJWTの署名を検証してuid/emailを抽出できる
 */
export async function fetchWithAuth(url, options = {}) {
  try {
    // 現在ログイン中のユーザーを取得
    const user = auth.currentUser;
    if (!user) {
      throw new Error("未ログインです");
    }

    // localStorageから既に発行されたJWTを取得
    // （期限切れの場合はFirebaseに自動で再発行リクエスト）
    const token = await user.getIdToken();

    // AuthorizationヘッダーにJWTを付与
    // サーバー側でverifyIdToken()により署名検証される
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("fetchWithAuthエラー:", error);
    throw error;
  }
}
