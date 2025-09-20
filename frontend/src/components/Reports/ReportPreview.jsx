// src/components/Reports/ReportPreview.jsx
import { useState } from "react";
import ReportItem from "./ReportItem";
import PropTypes from "prop-types";

export default function ReportPreview({ report }) {
  const [size, setSize] = useState("large");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* Toggle Preview */}
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
          <ReportItem report={report} size={size} linkToDetail={false} />

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

ReportPreview.propTypes = {
  report: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string,
    event: PropTypes.string.isRequired, // ObjectId of the event
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired, // ObjectId of the user
    carousel: PropTypes.string, // ObjectId of carousel (optional)
    excerpt: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    teaser: PropTypes.string,
    externalLinks: PropTypes.arrayOf(PropTypes.string),
    deleted: PropTypes.bool,
    deletedByEvent: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};
