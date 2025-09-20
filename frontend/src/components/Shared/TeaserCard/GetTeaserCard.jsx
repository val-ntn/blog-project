// src/components/Shared/GetTeaserCard.jsx
import React, { useEffect, useState } from "react";
import TeaserCard from "./TeaserCard";
import PropTypes from "prop-types";
import { API_BASE_URL } from "../../../utils/api";

export default function GetTeaserCard({ type = "post", title, size }) {
  const [item, setItem] = useState(null);

  // Fetch data
  useEffect(() => {
    let url = `${API_BASE_URL}/${type}s/latest`;
    if (title) url += `?title=${encodeURIComponent(title)}`;

    fetch(url)
      .then((res) => res.json())
      .then(setItem)
      .catch((err) => console.error("Error fetching TeaserCard:", err));
  }, [type, title]);

  if (!item) return <p>Loading...</p>;

  return <TeaserCard data={item} size={size} type={type} />;
}

GetTeaserCard.propTypes = {
  type: PropTypes.string, // optional, default "post"
  title: PropTypes.string, // optional
  size: PropTypes.string, // optional: if passed, forces size
};
