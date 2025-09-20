// src/components/Reports/ReportRecycleItem.jsx

import PropTypes from "prop-types";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";

export default function ReportRecycleItem({ report, size = "medium" }) {
  let contentToRender = null;

  switch (size) {
    case "large":
      contentToRender = report.content; // full report content
      break;
    case "small":
    default:
      contentToRender = null; // only title
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`report-item report-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{report.title}</h3>
        {contentToRender && <SafeHTMLRenderer content={contentToRender} />}
        {report.author?.name && (
          <small className="card__meta">By: {report.author.name}</small>
        )}
      </div>
    </div>
  );
}

ReportRecycleItem.propTypes = {
  report: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
