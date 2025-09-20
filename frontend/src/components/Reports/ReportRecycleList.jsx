// src/components/Reports/ReportRecycleList.jsx
import React, { useEffect, useState } from "react";
import ReportRecycleItem from "./ReportRecycleItem";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

export default function ReportRecycleList({
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/event-reports/bin`, { withCredentials: true })
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Failed to fetch deleted reports:", err));
  }, [refreshFlag]);

  if (!Array.isArray(reports)) return <p>Loading deleted reports...</p>;

  return (
    <div className="report-list--wrapper">
      {reports.length === 0 && <p>No deleted reports found</p>}
      {reports.map((report) => (
        <div key={report._id}>
          <ReportRecycleItem
            report={report}
            size={renderSize ? renderSize(report) : "small"}
          />
          {renderActions && renderActions(report)}
        </div>
      ))}
    </div>
  );
}

ReportRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};
