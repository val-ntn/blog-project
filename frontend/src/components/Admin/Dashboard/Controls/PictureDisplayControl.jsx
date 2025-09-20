// src/components/Admin/Dashboard/Controls/PictureDisplayControl.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import PictureDisplay from "../../../Images-Carousels/PictureDisplay";
import { API_BASE_URL } from "../../../../utils/api";

export default function PictureDisplayControl() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [displayMode, setDisplayMode] = useState("list");
  const [showManager, setShowManager] = useState(false); // toggle manager visibility

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/upload/images`, {
        withCredentials: true,
      });
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(`${API_BASE_URL}/upload/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${API_BASE_URL}/upload/images/${filename}`, {
        withCredentials: true,
      });
      fetchImages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "grid" ? "list" : "grid");
  };

  return (
    <div>
      {/* Main button to toggle manager */}
      <button
        type="button"
        onClick={() => setShowManager((prev) => !prev)}
        style={{ marginBottom: "1rem" }}
      >
        {showManager ? "Close Manage Images" : "Manage Images"}
      </button>

      {/* Show file manager only if toggled */}
      {showManager && (
        <PictureDisplay
          images={images}
          displayMode={displayMode}
          onDelete={handleDelete}
          onUpload={handleUpload}
          uploading={uploading}
          toggleDisplayMode={toggleDisplayMode} // pass toggle handler
        />
      )}
    </div>
  );
}
