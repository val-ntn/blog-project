// frontend/src/components/Images-Carousels/CarouselList.jsx

import CarouselItem from "./CarouselItem";
import PropTypes from "prop-types";

export default function CarouselList({
  carousels,
  onDelete,
  onSelect,
  disableDelete = false,
  viewMode = "grid",
}) {
  return (
    <div className={`carousel-list ${viewMode}`}>
      {carousels.map((carousel) => (
        <div key={carousel._id} className="carousel-list-item">
          <div onClick={() => onSelect?.(carousel)}>
            <CarouselItem carousel={carousel} />
          </div>
          {!disableDelete && onDelete && (
            <>
              <button type="button" onClick={() => onDelete(carousel._id)}>
                Delete
              </button>
              <button type="button" onClick={() => onSelect?.(carousel)}>
                Edit
              </button>{" "}
              {/* Add Edit */}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

CarouselList.propTypes = {
  carousels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      type: PropTypes.oneOf(["basic", "thumbs", "multi-row"]),
      deleted: PropTypes.bool,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  disableDelete: PropTypes.bool,
  viewMode: PropTypes.oneOf(["grid", "list"]),
};
