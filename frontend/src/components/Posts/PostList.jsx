// src/components/Posts/PostList.jsx
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../utils/api";

export default function PostList({
  limit,
  size = "medium",
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const start = performance.now(); // Start timing
    fetch(`${API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now(); // End timing
        console.log(`PostList fetch took ${end - start} ms`); // Log fetch time
        // Simply limit the posts, no need to sort them here
        setPosts(limit ? data.slice(0, limit) : data);
      })
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, [limit, refreshFlag]);

  return (
    <div className="post-list--wrapper">
      {posts.length === 0 && <p>No posts found</p>}
      {posts.map((post) => (
        <div key={post._id}>
          <PostItem post={post} size={renderSize ? renderSize(post) : size} />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}
PostList.propTypes = {
  limit: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};
