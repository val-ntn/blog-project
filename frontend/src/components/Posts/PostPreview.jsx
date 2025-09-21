// src/components/Posts/PostPreview.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

export default function PostPreview({ post }) {
  const [size, setSize] = useState("large");
  const [isOpen, setIsOpen] = useState(false); // toggles preview visibility

  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          marginBottom: "0.5rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        {isOpen ? "Close Preview" : "Preview"}
      </button>

      {/* Preview content */}
      {isOpen && (
        <div>
          <PostItem post={post} size={size} linkToDetail={false} />

          {/* Size controls */}
          <div style={{ marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={() => setSize("small")}
              style={{ marginRight: "0.5rem" }}
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => setSize("medium")}
              style={{ marginRight: "0.5rem" }}
            >
              Medium
            </button>
            <button type="button" onClick={() => setSize("large")}>
              Large
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string, // optional
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.oneOfType([
      PropTypes.string, // saved post: ID
      PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }), // draft
    ]),
    carousel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    views: PropTypes.number,
    thumbnail: PropTypes.string,
    teaser: PropTypes.string,
    deleted: PropTypes.bool,
    externalLinks: PropTypes.arrayOf(PropTypes.string),
    excerpt: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};
