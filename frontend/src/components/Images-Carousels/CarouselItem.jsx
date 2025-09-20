// frontend/src/components/Images-Carousels/CarouselItem.jsx

import React from "react";
import BasicCarousel from "./variants/BasicCarousel";
import ThumbsCarousel from "./variants/ThumbsCarousel";
import MultiRowCarousel from "./variants/MultiRowCarousel";
import PropTypes from "prop-types";

export default function CarouselItem({ carousel }) {
  const { title, images, type = "basic" } = carousel;

  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  switch (type) {
    case "thumbs":
      return <ThumbsCarousel images={images} title={title} />;
    case "multi-row":
      return <MultiRowCarousel images={images} title={title} />;
    case "basic":
    default:
      return <BasicCarousel images={images} title={title} />;
  }
}

CarouselItem.propTypes = {
  carousel: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(["basic", "thumbs", "multi-row"]),
    deleted: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};
