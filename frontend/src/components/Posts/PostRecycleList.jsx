// src/components/Posts/PostRecycleList.jsx
import React, { useEffect, useState } from "react";
import PostRecycleItem from "./PostRecycleItem";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

export default function PostRecycleList({
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch deleted posts:", err));
  }, [refreshFlag]);

  if (!Array.isArray(posts)) return <p>Loading deleted posts...</p>;

  return (
    <div className="post-list--wrapper">
      {posts.length === 0 && <p>No deleted posts found</p>}
      {posts.map((post) => (
        <div key={post._id}>
          <PostRecycleItem
            post={post}
            size={renderSize ? renderSize(post) : "small"}
          />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}

PostRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};
