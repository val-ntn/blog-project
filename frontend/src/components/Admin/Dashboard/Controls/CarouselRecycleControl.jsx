// src/components/Admin/Dashboard/Controls/CarouselRecycleControl.jsx
import CarouselRecycleList from "../../../Images-Carousels/CarouselRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import axios from "axios";

export default function CarouselRecycleControl({ refreshFlag, onRestore }) {
  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/carousels/restore/${id}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    if (!window.confirm("Permanently delete this carousel?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/carousels/hard/${id}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Carousels</h3>
      <CarouselRecycleList
        refreshFlag={refreshFlag}
        onRestore={handleRestore}
        onHardDelete={handleHardDelete}
      />
    </div>
  );
}
