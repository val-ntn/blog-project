// src/components/Events/EventRecycleItem.jsx
import PropTypes from "prop-types";

import { formatDateRange, getExcerpt } from "../../utils/format";

export default function EventRecycleItem({ event, size = "small" }) {
  const showExtraMeta = size === "large";

  let contentToRender;
  switch (size) {
    case "small":
      contentToRender = event.excerpt || getExcerpt(event.description, 60);
      break;
    case "large":
    default:
      contentToRender = event.description;
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div
        className={`event-item event-item--${size} event-item--${size}--wrapper`}
      >
        <h4 className={`event-item__title event-item__title--${size}`}>
          {event.title}
        </h4>

        <div className="event-item__body">
          <div className="event-item__col event-item__col--main">
            {contentToRender && (
              <p className="event-item__text">{contentToRender}</p>
            )}
            <small className="card__date">
              {formatDateRange(event.startDate, event.endDate)}
            </small>
          </div>

          {showExtraMeta && (
            <div className="event-item__col event-item__col--meta">
              {event.location && (
                <p>
                  <strong>📍 Location:</strong> {event.location}
                </p>
              )}
              {event.schedule && (
                <p>
                  <strong>🕒 Schedule:</strong> {event.schedule}
                </p>
              )}
              {event.costs && (
                <p>
                  <strong>💲 Costs:</strong> {event.costs}
                </p>
              )}
              {event.contact && (
                <p>
                  <strong>☎ Contact:</strong> {event.contact}
                </p>
              )}
              {event.source && (
                <p>
                  <a
                    href={event.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EventRecycleItem.propTypes = {
  event: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
