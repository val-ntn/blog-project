// frontend/src/components/Admin/Editors/ImageToolbar.jsx

import PropTypes from "prop-types";
import "./ImageToolbar.css"; // or rename to ImageToolbar.css if you prefer

export default function ImageToolbar({
  //selectedImgRef,
  toolbarRef,
  selectedSides,
  setSelectedSides,
  onAction,
}) {
  const toggleSide = (side) => {
    setSelectedSides((prev) => {
      const newSet = new Set(prev);
      if (side === "all") {
        newSet.clear();
        ["all", "top", "right", "bottom", "left"].forEach((s) => newSet.add(s));
      } else {
        newSet.delete("all");
        if (newSet.has(side)) newSet.delete(side);
        else newSet.add(side);
        if (["top", "right", "bottom", "left"].every((s) => newSet.has(s))) {
          newSet.add("all");
        }
      }
      return newSet;
    });
  };

  const getButtonStyle = (side) => ({
    fontWeight: selectedSides.has(side) ? "bold" : "normal",
    backgroundColor: selectedSides.has(side) ? "#d0e6ff" : "transparent",
    border: "1px solid #ccc",
    borderRadius: "3px",
    padding: "2px 6px",
    cursor: "pointer",
    userSelect: "none",
  });

  return (
    <div ref={toolbarRef} className="image-toolbar">
      <button
        type="button"
        onClick={() => toggleSide("all")}
        style={getButtonStyle("all")}
        title="All sides"
      >
        ■
      </button>
      <button
        type="button"
        onClick={() => toggleSide("top")}
        style={getButtonStyle("top")}
        title="Top margin"
      >
        ▀
      </button>
      <button
        type="button"
        onClick={() => toggleSide("right")}
        style={getButtonStyle("right")}
        title="Right margin"
      >
        ▐
      </button>
      <button
        type="button"
        onClick={() => toggleSide("bottom")}
        style={getButtonStyle("bottom")}
        title="Bottom margin"
      >
        ▄
      </button>
      <button
        type="button"
        onClick={() => toggleSide("left")}
        style={getButtonStyle("left")}
        title="Left margin"
      >
        ▌
      </button>

      <button
        type="button"
        onClick={() => onAction("increase-margin")}
        title="Increase margin"
      >
        ➕
      </button>
      <button
        type="button"
        onClick={() => onAction("decrease-margin")}
        title="Decrease margin"
      >
        ➖
      </button>
      <button
        type="button"
        onClick={() => onAction("align-left")}
        title="Align Left"
      >
        ▌
      </button>
      <button
        type="button"
        onClick={() => onAction("align-right")}
        title="Align Right"
      >
        ▐
      </button>
      <button
        type="button"
        onClick={() => onAction("reset-styles")}
        title="Reset styles"
      >
        ⟲
      </button>
    </div>
  );
}

ImageToolbar.propTypes = {
  selectedImgRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  toolbarRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  selectedSides: PropTypes.instanceOf(Set).isRequired,
  setSelectedSides: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};
