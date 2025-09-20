// frontend/src/components/Images-Carousels/CarouselRecycleItem.jsx
import { useState } from "react";
import CarouselItem from "./CarouselItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./CarouselRecycle.css";

export default function CarouselRecycleItem({
  carousel,
  onRestore,
  onHardDelete,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="carousel-recycle__row">
        <div className="carousel-recycle__symbol">🎞️</div>
        <div className="carousel-recycle__filename">{carousel.title}</div>
        <div className="carousel-recycle__type">{carousel.type || "basic"}</div>
        <div className="carousel-recycle__size">
          {carousel.images?.length || 0} images
        </div>

        <div className="carousel-recycle__actions">
          <button
            type="button"
            className="dashboard-action-buttons__restore"
            onClick={() => onRestore(carousel._id)}
          >
            ♻ Restore
          </button>

          <button
            type="button"
            className="dashboard-action-buttons__delete"
            onClick={() => onHardDelete(carousel._id)}
          >
            🗑 Hard Delete
          </button>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="dashboard-action-buttons__expand"
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="carousel-recycle__preview">
          <CarouselItem carousel={carousel} />
        </div>
      )}
    </>
  );
}
