// src/components/Images-Carousels/PictureRecycleItem.jsx
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../utils/api";
import "./PictureRecycle.css";

export default function PictureRecycleItem({ image }) {
  const imageUrl = `${API_BASE_URL}/uploads/${image.filename}`;

  return (
    <div className="picture-recycle__item">
      <h4 className="picture-recycle__title">
        {image.originalName || image.filename}
      </h4>
      <img
        className="picture-recycle__img"
        src={imageUrl}
        alt={image.originalName || "Deleted image"}
      />
    </div>
  );
}
PictureRecycleItem.propTypes = {
  image: PropTypes.object.isRequired,
};
