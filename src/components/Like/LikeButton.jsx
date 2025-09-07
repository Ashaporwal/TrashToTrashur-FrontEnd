import React, { useState, useEffect } from "react";
import axios from "axios";

function LikeButton({ postId, userId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${postId}`);
        setLikesCount(res.data.likedBy.length);
        setLiked(res.data.likedBy.some(u => u._id === userId));
      } catch (err) {
        console.error("Failed to fetch likes:", err.message);
      }
    };
    fetchPost();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/posts/${postId}/like`, { userId });
      setLikesCount(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Like error:", err.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        background: liked ? "red" : "grey",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {liked ? "❤️ Liked" : "🤍 Like"} ({likesCount})
    </button>
  );
}

export default LikeButton;


