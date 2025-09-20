// src/components/Reports/ReportList.jsx

import React, { useEffect, useState } from "react";
import ReportItem from "./ReportItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";

export default function ReportList({
  limit,
  size = "medium",
  refreshFlag,
  renderActions,
  renderSize,
  linkToDetail = false,
}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/event-reports`)
      .then((res) => res.json())
      .then((data) => {
        // Optionally limit reports
        setReports(limit ? data.slice(0, limit) : data);
      })
      .catch((err) => console.error("Failed to fetch reports:", err));
  }, [limit, refreshFlag]);

  return (
    <div className="report-list--wrapper">
      {reports.length === 0 && <p>No reports found</p>}
      {reports.map((report) => (
        <div key={report._id}>
          <ReportItem
            report={report}
            size={renderSize ? renderSize(report) : size}
            linkToDetail={linkToDetail}
          />
          {renderActions && renderActions(report)}
        </div>
      ))}
    </div>
  );
}
ReportList.propTypes = {
  limit: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  refreshFlag: PropTypes.any, // could be number, bool, string – whatever you toggle
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
  linkToDetail: PropTypes.bool,
};
