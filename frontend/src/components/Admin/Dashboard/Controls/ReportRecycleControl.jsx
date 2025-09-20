// src/components/Admin/Dashboard/Controls/ReportRecycleControl.jsx
import { useState } from "react";
import ReportRecycleList from "../../../Reports/ReportRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function ReportRecycleControl({ refreshFlag, onRestore }) {
  const [expandedReports, setExpandedReports] = useState({});

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/event-reports/restore/${id}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this report? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/event-reports/hard/${id}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  const toggleReportSize = (id) => {
    setExpandedReports((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  console.log("Rendering PostRecycleControl");
  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Reports</h3>
      <ReportRecycleList
        refreshFlag={refreshFlag}
        renderActions={(report) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__restore"
                onClick={() => handleRestore(report._id)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleHardDelete(report._id)}
              >
                🗑 Hard Delete
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => toggleReportSize(report._id)}
              >
                {expandedReports[report._id] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>
            </div>
          </div>
        )}
        renderSize={(report) =>
          expandedReports[report._id] ? "large" : "small"
        }
      />
    </div>
  );
}
