// src/components/Events/EventPreview.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import EventItem from "./EventItem";

export default function EventPreview({ event }) {
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
          <EventItem event={event} size={size} linkToDetail={false} />

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

EventPreview.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    location: PropTypes.string,
    contact: PropTypes.string,
    schedule: PropTypes.string,
    costs: PropTypes.string,
    source: PropTypes.string,
    iconURL: PropTypes.string,
    imageURL: PropTypes.string,
    description: PropTypes.string,
    relatedPostId: PropTypes.string,
    deleted: PropTypes.bool,
  }).isRequired,
};
