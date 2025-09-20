// src/components/Images-Carousels/PictureRecycleList.jsx
import { useEffect, useState } from "react";
import PictureRecycleItem from "./PictureRecycleItem";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import "./PictureRecycle.css";

export default function PictureRecycleList({ refreshFlag, renderActions }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/upload/images/bin`, { withCredentials: true })
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Failed to fetch deleted images:", err));
  }, [refreshFlag]);

  if (!Array.isArray(images)) return <p>Loading deleted images...</p>;

  /*return (
    <div className="picture-list--wrapper">
      {images.length === 0 && <p>No deleted images found</p>}
      {images.map((image) => (
        <div key={image._id}>
          <PictureRecycleItem image={image} />
          {renderActions && renderActions(image)}
        </div>
      ))}
    </div>
  );*/

  return (
    <div className="picture-recycle__row">
      {images.map((image) => (
        <div className="picture-recycle__column" key={image._id}>
          <PictureRecycleItem image={image} />
          {renderActions && (
            <div className="picture-recycle__actions">
              {renderActions(image)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

PictureRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
};
