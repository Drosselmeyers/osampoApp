import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

// Context生成(ログインに関する情報を管理)
const AuthContext = createContext();
// firebase の定義情報（各値はFirebaseのアプリ利用で取得した値を使用する）
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_APIKEY,
  authDomain: import.meta.env.FIREBASE_AUTODOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase（firebase, GoogleAuth 初期設定）
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// AuthContextProvider (Provider)
export const AuthContextProvider = ({ children }) => {
  // ログインユーザ
  const [loginUser, setLoginUser] = useState();

  // 起動時ログイン処理(既にログインしてる場合, ユーザ設定)
  useEffect(() => {
    // auth 初期化時にログインユーザ設定
    auth.onAuthStateChanged((user) => setLoginUser(user));
  }, []);

  // ログイン処理
  const login = async () => {
    // Google ログインのポップアップ表示して認証結果取得
    const result = await signInWithPopup(auth, provider);
    // 認証結果より user 設定
    setLoginUser(result.user);
  };

  // ログアウト処理
  const logout = async () => {
    await signOut(auth);
    setLoginUser(null);
  };

  // ログイン情報設定したProvider
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthContextConsumer (useContext) # Provider で囲った範囲で使う必要あり
export const AuthContextConsumer = () => {
  return useContext(AuthContext);
};
