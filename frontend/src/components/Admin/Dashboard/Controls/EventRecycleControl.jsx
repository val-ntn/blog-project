// EventRecycleControl.jsx
import { useState } from "react";
import EventRecycleList from "../../../Events/EventRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function EventRecycleControl({ refreshFlag, onRestore }) {
  const [expandedEvents, setExpandedEvents] = useState({});

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/events/restore/${id}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/hard/${id}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  const toggleEventSize = (id) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Events</h3>
      <EventRecycleList
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                className="dashboard-action-buttons__restore"
                type="button"
                onClick={() => handleRestore(event._id)}
              >
                ♻ Restore
              </button>
              <button
                className="dashboard-action-buttons__delete"
                type="button"
                onClick={() => handleHardDelete(event._id)}
              >
                🗑 Hard Delete
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => toggleEventSize(event._id)}
              >
                {expandedEvents[event._id] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>
            </div>
          </div>
        )}
        renderSize={(event) => (expandedEvents[event._id] ? "large" : "small")}
      />
    </div>
  );
}
