import { useState, useEffect, useRef } from "react";
import apiClient from "./config/apiClient";
import { NavBar } from "./NavBar";
import "./PostPage.css";

export const PostPage = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/posts");
        setPosts(res.data);
      } catch (error) {
        setError("投稿の取得に失敗しました");
        console.error("投稿の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // リロード防止: 投稿前にリロードすると画像だけimgBBに残ってDB保存が走らない不整合を緩和
  // https://note.com/itahana_depart/n/nc8e7b64013e9
  // キャプション/画像がある状態でページを離脱しようとすると警告を表示
  // ユーザーが「このページを離れる」を選択した場合、画像はimgBBに残ったままになる
  // （imageBBに削除APIがないので完全防止は無理ぽい）
  // ただ、現在e.returnValue=""は非推奨らしい
  // https://developer.mozilla.org/ja/docs/Web/API/Event/returnValue
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // キャプションまたは画像URLが存在するとき
      // 投稿ボタンを押さずに、ページリロード等するとDB保存が走らないから消えるよ～を出す
      if (caption.trim() || imageUrl) {
        e.preventDefault(); // デフォルトの離脱動作をキャンセルしてから、
        e.returnValue = ""; // 「行った変更が保存されない可能性があります。」アラートを出す(Chrome等で警告を表示するフラグらしい)
      }
    };

    // リロード、タブ閉じ、別ページ遷移などでイベント発火
    window.addEventListener("beforeunload", handleBeforeUnload);
    // クリーンアップ: コンポーネントアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [caption, imageUrl]); // caption/imageUrlが変わるたびに再登録

  const handleUpload = () => {
    inputRef.current.click();
  };

  // 画像を受け取り、imgBB API叩いてurl GET
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        setError("画像のアップロードに失敗しました");
      }
    } catch (error) {
      setError("画像のアップロードに失敗しました");
      console.error("画像アップロードエラー:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleCancelImage = () => {
    setImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // DB保存操作
  const handleSubmitPost = async () => {
    setLoading(true);
    setError(null);

    try {
      // captionは必須
      await apiClient.post("/posts", {
        caption: caption.trim(),
        image_url: imageUrl || null,
      });

      // 投稿成功後、フォームをリセット
      setCaption("");
      setImageUrl("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // 投稿後に投稿一覧を再取得
      const res = await apiClient.get("/posts");
      setPosts(res.data);
    } catch (error) {
      setError("投稿の作成に失敗しました");
      console.error("投稿作成エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReflesh = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/posts");
      setPosts(res.data);
    } catch (error) {
      setError("投稿の取得に失敗しました");
      console.error("投稿の取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>投稿を作成</h2>
        <div>
          <textarea
            placeholder="お散歩のコメントを自由に入力"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "8px",
              resize: "none",
            }}
          />
          <button onClick={handleUpload} style={{ marginRight: "8px" }}>
            {uploading ? "アップロード中..." : "画像をアップロード"}
          </button>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
          {imageUrl && (
            <div>
              <p>プレビュー:</p>
              <img src={imageUrl} />
              <button onClick={handleCancelImage}>画像を選びなおす</button>
            </div>
          )}
          <button
            onClick={handleSubmitPost}
            disabled={loading || uploading || !caption.trim()}
          >
            投稿する
          </button>
        </div>
        <hr></hr>
        <h2>投稿一覧</h2>
        <button onClick={handleReflesh} style={{ marginBottom: "8px" }}>
          更新
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && posts.length === 0 && <p>投稿がありません</p>}
        {!loading &&
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <p>{post.caption}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  style={{ maxWidth: "100%", borderRadius: "4px" }}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};
