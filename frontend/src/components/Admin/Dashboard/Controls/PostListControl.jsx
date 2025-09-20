// src/components/Admin/Dashboard/Controls/PostListControl.jsx
import { useState } from "react";
import PostList from "../../../Posts/PostList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function PostListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const [expandedPosts, setExpandedPosts] = useState({});
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const togglePostSize = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <PostList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__edit"
                onClick={() => onEdit?.(post)}
              >
                ✏ Edit
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleDelete(post._id)}
              >
                🗑 Delete
              </button>
            </div>
            {/* Toggle size for this post */}
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => togglePostSize(post._id)}
              >
                {expandedPosts[post._id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        )}
        size="small"
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}
