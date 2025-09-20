// src/components/admin/CarouselSelector.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import CarouselDisplay from "../Images-Carousels/CarouselDisplay";

export default function CarouselSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [carousels, setCarousels] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/carousels`, { withCredentials: true })
        .then((res) => setCarousels(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (carousel) => {
    onSelect(carousel); // pass up selection
    setOpen(false); // close after selecting
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Carousel
      </Button>

      {open && (
        <div>
          <CarouselDisplay
            carousels={carousels}
            onSelect={handleSelect}
            displayMode={viewMode}
            toggleDisplayMode={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            mode="picker" // 👈 IMPORTANT: disables delete/edit/add
          />
        </div>
      )}
    </div>
  );
}

CarouselSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // callback when carousel picked
};
