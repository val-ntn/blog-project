// src/components/Admin/Dashboard/Controls/PictureRecycleControl.jsx
import PictureRecycleList from "../../../Images-Carousels/PictureRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import axios from "axios";

export default function PictureRecycleControl({ refreshFlag, onRestore }) {
  const handleRestore = async (filename) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/upload/images/restore/${filename}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (filename) => {
    try {
      await axios.delete(`${API_BASE_URL}/upload/images/hard/${filename}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Images</h3>

      <PictureRecycleList
        refreshFlag={refreshFlag}
        renderActions={(image) => (
          <div className="picture-recycle__actions">
            <div className="picture-recycle__actions">
              <button
                type="button"
                className="picture-recycle__button picture-recycle__button--restore"
                onClick={() => handleRestore(image.filename)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="picture-recycle__button picture-recycle__button--delete"
                onClick={() => handleHardDelete(image.filename)}
              >
                🗑 Hard Delete
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
