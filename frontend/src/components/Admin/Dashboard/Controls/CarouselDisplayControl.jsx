// src/components/Admin/Dashboard/Controls/CarouselDisplayControl.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import CarouselDisplay from "../../../Images-Carousels/CarouselDisplay";
import CarouselForm from "../../Forms/CarouselForm/CarouselFormObj";
import { API_BASE_URL } from "../../../../utils/api";

export default function CarouselDisplayControl() {
  const [carousels, setCarousels] = useState([]);
  const [displayMode, setDisplayMode] = useState("list");
  const [showManager, setShowManager] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCarousels = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/carousels`, {
        withCredentials: true,
      });
      setCarousels(res.data);
    } catch (err) {
      console.error("Failed to fetch carousels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/carousels/${id}`, {
        withCredentials: true,
      });
      fetchCarousels();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAdd = () => {
    setEditingCarousel(null); // new carousel
    setShowForm(true);
  };

  const handleEdit = (carousel) => {
    setEditingCarousel(carousel);
    setShowForm(true);
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
        {showManager ? "Close Manage Carousels" : "Manage Carousels"}
      </button>

      {showManager && (
        <>
          <CarouselDisplay
            carousels={carousels}
            displayMode={displayMode}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAdd={handleAdd}
            toggleDisplayMode={toggleDisplayMode}
          />

          {/* Show Form */}
          {showForm && (
            <div style={{ marginTop: "1rem" }}>
              <CarouselForm
                initialData={editingCarousel}
                onClose={() => setShowForm(false)}
                onCreateSuccess={() => {
                  setShowForm(false);
                  fetchCarousels();
                }}
              />
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ marginTop: "0.5rem" }}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
