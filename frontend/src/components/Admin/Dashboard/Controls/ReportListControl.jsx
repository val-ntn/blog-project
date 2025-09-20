// src/components/Admin/Dashboard/Controls/ReportListControl.jsx

import ReportList from "../../../Reports/ReportList";
import { API_BASE_URL } from "../../../../utils/api";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from "axios";

export default function ReportListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const [expandedReports, setExpandedReports] = useState({});
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/event-reports/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const toggleReportSize = (id) => {
    setExpandedReports((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div>
      <ReportList
        refreshFlag={refreshFlag}
        renderActions={(report) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__edit"
                onClick={() => onEdit?.(report)}
              >
                ✏ Edit
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleDelete(report._id)}
              >
                🗑 Delete
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
        size="small"
        renderSize={(report) =>
          expandedReports[report._id] ? "large" : "small"
        }
      />
    </div>
  );
}

ReportListControl.propTypes = {
  refreshFlag: PropTypes.any, // used to trigger list refresh
  onRefresh: PropTypes.func, // optional callback after a report is deleted
  onRecycleRefresh: PropTypes.func, // optional callback for recycle bin refresh
  onEdit: PropTypes.func, // optional callback when clicking edit
};
