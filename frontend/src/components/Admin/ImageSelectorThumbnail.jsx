// frontend/src/components/admin/ImageSelectorThumbnail.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import Button from "../UI/Button";
import PictureDisplay from "../Images-Carousels/PictureDisplay";

export default function ImageSelectorForForm({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (image) => {
    const url = `${API_BASE_URL}${image.path}`;
    onSelect(url);
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Thumbnail Image
      </Button>
      {open && (
        <PictureDisplay
          images={images}
          onSelect={handleSelect}
          displayMode={viewMode}
          toggleDisplayMode={() =>
            setViewMode(viewMode === "grid" ? "list" : "grid")
          }
          showCopyButton
          mode="picker"
        />
      )}
    </div>
  );
}
