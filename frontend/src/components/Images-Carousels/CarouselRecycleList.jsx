// src/components/Images-Carousels/CarouselRecycleList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import CarouselRecycleItem from "./CarouselRecycleItem";
import "./CarouselRecycle.css";
import { API_BASE_URL } from "../../utils/api";

export default function CarouselRecycleList({
  refreshFlag,
  onRestore,
  onHardDelete,
}) {
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/carousels/bin`, { withCredentials: true })
      .then((res) => setCarousels(res.data))
      .catch(console.error);
  }, [refreshFlag]);

  if (!Array.isArray(carousels)) return <p>Loading deleted carousels...</p>;

  return (
    <div className="carousel-recycle__list">
      {carousels.length === 0 && <p>No deleted carousels.</p>}
      {carousels.map((carousel) => (
        <CarouselRecycleItem
          key={carousel._id}
          carousel={carousel}
          onRestore={onRestore}
          onHardDelete={onHardDelete}
        />
      ))}
    </div>
  );
}
