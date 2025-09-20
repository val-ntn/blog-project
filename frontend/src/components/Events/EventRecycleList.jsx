// EventRecycleList.jsx
import React, { useEffect, useState } from "react";
import EventRecycleItem from "./EventRecycleItem";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

export default function EventRecycleList({
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events/bin`, { withCredentials: true })
      .then((res) => {
        console.log("Deleted events fetched from backend:", res.data); // <- here
        setEvents(res.data);
      })
      .catch((err) => console.error("Failed to fetch deleted events:", err));
  }, [refreshFlag]);

  if (!Array.isArray(events)) return <p>Loading deleted events...</p>;
  console.log("events fetched:", events);
  return (
    <div className="event-list--wrapper">
      {events.length === 0 && <p>No deleted events found</p>}
      {events.map((event) => (
        <div key={event._id}>
          <EventRecycleItem
            event={event}
            size={renderSize ? renderSize(event) : "medium"}
          />
          {renderActions && renderActions(event)}
        </div>
      ))}
    </div>
  );
}

EventRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};
