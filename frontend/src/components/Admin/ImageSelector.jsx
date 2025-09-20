// src/components/admin/ImageSelector.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import PictureDisplay from "../Images-Carousels/PictureDisplay";

export default function ImageSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Fetch images when dropdown opens
  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  // Pass full image object up
  const handleSelect = (image) => {
    onSelect(image);
    setOpen(false); // close after selecting
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Image
      </Button>

      {open && (
        <div>
          <PictureDisplay
            images={images}
            onSelect={handleSelect}
            displayMode={viewMode}
            toggleDisplayMode={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            showCopyButton
            mode="picker" // disables upload/delete
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // returns the selected image object
};
