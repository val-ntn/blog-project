// src/components/Images-Carousels/CarouselDisplay.jsx
import { useState } from "react";
import CarouselItem from "./CarouselItem";
import "./CarouselDisplay.css";

export default function CarouselDisplay({
  carousels,
  onDelete, // admin-only
  onEdit, // admin-only
  onAdd, // admin-only
  onSelect, // picker-only
  adding,
  displayMode = "list",
  toggleDisplayMode,
  mode = "admin", // NEW: controls behavior ("admin" or "picker")
}) {
  const [selectedCarousel, setSelectedCarousel] = useState(null);

  const handleSelect = (carousel) => {
    if (selectedCarousel?._id === carousel._id) {
      setSelectedCarousel(null);
    } else {
      setSelectedCarousel(carousel);
    }
  };

  return (
    <div className="carousel">
      {/* Admin-only "Add new" button */}
      {mode === "admin" && (
        <div style={{ marginBottom: "1rem" }}>
          <button type="button" onClick={onAdd} disabled={adding}>
            Add New Carousel
          </button>
          {adding && <p>Adding...</p>}
        </div>
      )}

      {/* Header with toggle button (shared) */}
      <div className="carousel__display-header">
        <div className="carousel__header-spacer"></div>
        <button type="button" onClick={toggleDisplayMode}>
          Switch to {displayMode === "grid" ? "List View" : "Thumbnail View"}
        </button>
      </div>

      {/* Main display area */}
      <div className="carousel__display-wrapper">
        {displayMode === "grid" ? (
          <div className="carousel__scroll-wrapper">
            <div className="carousel__grid">
              {carousels.map((carousel) => {
                const isSelected = selectedCarousel?._id === carousel._id;
                return (
                  <div
                    key={carousel._id}
                    className={`carousel__row carousel__row--grid ${
                      isSelected ? "carousel__row--selected" : ""
                    }`}
                  >
                    {/* Carousel preview */}
                    <CarouselItem carousel={carousel} />

                    {/* Buttons below the carousel */}
                    <div className="carousel__buttons">
                      {mode === "picker" && (
                        <button
                          type="button"
                          className="carousel__select"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect?.(carousel);
                          }}
                        >
                          Select
                        </button>
                      )}
                      {mode === "admin" && (
                        <>
                          <button
                            type="button"
                            className="carousel__delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete?.(carousel._id);
                              if (selectedCarousel?._id === carousel._id)
                                setSelectedCarousel(null);
                            }}
                          >
                            🗑 Delete
                          </button>
                          <button
                            type="button"
                            className="carousel__delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit?.(carousel);
                            }}
                          >
                            ✏ Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="carousel__display-content">
            <div className="carousel__scroll-wrapper">
              {/* Left: List */}
              <div className="carousel__list">
                {carousels.map((carousel) => {
                  const isSelected = selectedCarousel?._id === carousel._id;
                  return (
                    <div
                      key={carousel._id}
                      className={`carousel__row carousel__row--list ${
                        isSelected ? "carousel__row--selected" : ""
                      }`}
                      onClick={() => handleSelect(carousel)}
                    >
                      <div className="carousel__symbol">🎞️</div>
                      <div className="carousel__filename">{carousel.title}</div>
                      <div className="carousel__type">
                        {carousel.type || "basic"}
                      </div>
                      <div className="carousel__size">
                        {carousel.images?.length || 0} images
                      </div>

                      {/* Admin mode */}
                      {mode === "admin" && (
                        <>
                          <button
                            type="button"
                            className="carousel__delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(carousel._id);
                              if (isSelected) setSelectedCarousel(null);
                            }}
                          >
                            🗑 Delete
                          </button>
                          <button
                            type="button"
                            className="carousel__delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit?.(carousel);
                            }}
                          >
                            ✏ Edit
                          </button>
                        </>
                      )}

                      {/* Picker mode */}
                      {mode === "picker" && (
                        <button
                          type="button"
                          className="carousel__select"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect?.(carousel);
                          }}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/*  Preview */}
            <div className="carousel__preview">
              {selectedCarousel && <CarouselItem carousel={selectedCarousel} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
