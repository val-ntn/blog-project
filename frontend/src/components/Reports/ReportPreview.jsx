// src/components/Reports/ReportPreview.jsx
import { useState } from "react";
import ReportItem from "./ReportItem";

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
