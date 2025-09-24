// src/components/Shared/TeaserCard/TeaserCardPreview.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import TeaserCard from "./TeaserCard";

export default function TeaserCardPreview({ data, type }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

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
        {isOpen ? "Close Teaser Preview" : "Show Teaser Preview"}
      </button>

      {/* Preview content */}
      {isOpen && (
        <TeaserCard
          data={data}
          // Leave `size` undefined to let TeaserCard auto-resize
          type={type}
          linkToDetail={false} // prevent linking from preview
        />
      )}
    </div>
  );
}

TeaserCardPreview.propTypes = {
  data: PropTypes.object.isRequired, // post/event/report object
  type: PropTypes.string.isRequired, // "post", "event", or "report"
};
