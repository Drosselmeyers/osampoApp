import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth, googleProvider } from "../config/firebase";
import { fetchWithAuth } from "../config/apiClient";

// Context生成(ログインに関する情報を管理)
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // ログインユーザ
  const [loginUser, setLoginUser] = useState();

  // 起動時ログイン処理(既にログインしてる場合, ユーザ設定)
  useEffect(() => {
    // auth初期化時にログインユーザ設定
    auth.onAuthStateChanged((user) => setLoginUser(user));
  }, []);

  // Googleログイン式（DBにも自動登録）
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    setLoginUser(result.user);

    try {
      // BEにユーザ情報を保存（upsert）
      // 既存なら、サーバ側でupsertはせず、uidに紐づくuser情報を返す
      await fetchWithAuth("/api/users", {
        method: "POST",
        body: JSON.stringify({
          uid: result.user.uid,
          email: result.user.email,
        }),
      });
    } catch (error) {
      // DB保存失敗時の処理
      // 新規ユーザーの場合のみFirebaseユーザーを削除してロールバック
      if (result.additionalUserInfo?.isNewUser) {
        await result.user.delete();
        setLoginUser(null);
      }
      throw new Error("ユーザー情報の保存に失敗しました");
    }

    return result.user;
  };

  // メール/パスワードログイン（既存ユーザー）
  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setLoginUser(result.user);
    return result.user;
  };

  // Google登録処理（loginWithGoogleによって、既存か新規の検証をサーバ側で行い、
  // 新規なら登録する処理を行っているので、loginWithGoogleを呼べばよい）
  // 登録がすんだら、user情報が返ってくる
  const signUpWithGoogle = async () => {
    return await loginWithGoogle();
  };

  // メール/パスワード登録処理
  const signUpWithEmail = async (email, password) => {
    // 新規作成
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setLoginUser(result.user);

    try {
      // BEにユーザー情報を保存
      await fetchWithAuth("/api/users", {
        method: "POST",
        body: JSON.stringify({
          uid: result.user.uid,
          email: result.user.email,
        }),
      });
    } catch (error) {
      // DB保存失敗 → Firebaseユーザーを削除してロールバック
      await result.user.delete();
      setLoginUser(null);
      throw new Error("ユーザー登録に失敗しました");
    }

    return result.user;
  };

  // ログアウト処理
  const logout = async () => {
    await signOut(auth);
    setLoginUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        loginWithGoogle,
        loginWithEmail,
        signUpWithGoogle,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = () => {
  return useContext(AuthContext);
};
