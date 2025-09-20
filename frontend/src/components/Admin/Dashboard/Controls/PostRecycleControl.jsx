// src/components/Admin/Dashboard/Controls/PostRecycleControl.jsx
import { useState } from "react";
import PostRecycleList from "../../../Posts/PostRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function PostRecycleControl({ refreshFlag, onRestore }) {
  const [expandedPosts, setExpandedPosts] = useState({});

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/posts/restore/${id}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore(); // trigger refresh
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  const togglePostSize = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Posts</h3>

      <PostRecycleList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__restore"
                onClick={() => handleRestore(post._id)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleHardDelete(post._id)}
              >
                🗑 Hard Delete
              </button>
            </div>
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
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}
