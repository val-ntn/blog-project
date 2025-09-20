// frontend/src/components/Admin/Forms/CarouselForm/CarouselFormObj.jsx

import { useState, useEffect } from "react";
import ImageSelector from "../../ImageSelector";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import CarouselLivePreview from "../../../Images-Carousels/CarouselLivePreview";
import Button from "../../../UI/Button";
import "./CarouselForm.css";

export default function CarouselForm({
  initialData = null,
  onCreateSuccess,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);
  const [type, setType] = useState("basic");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setImages(initialData.images || []);
      setType(initialData.type || "basic");
      setDescription(initialData.description || "");
      setExternalLink(initialData.externalLink || "");
      setIsActive(initialData.isActive ?? true);
    } else {
      setTitle("");
      setImages([]);
      setType("basic");
      setDescription("");
      setExternalLink("");
      setIsActive(true);
    }
  }, [initialData]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setExternalLink("");
    setIsActive(true);
    setImages([]);
    setType("basic");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please select at least one image.");
      return;
    }

    const newCarouselItem = {
      title,
      description,
      images,
      externalLink,
      isActive,
      type,
    };

    try {
      if (initialData?._id) {
        await axios.put(
          `${API_BASE_URL}/carousels/${initialData._id}`,
          newCarouselItem,
          {
            withCredentials: true,
          }
        );
        alert("Carousel updated!");
      } else {
        await axios.post(`${API_BASE_URL}/carousels`, newCarouselItem, {
          withCredentials: true,
        });
        alert("Carousel created!");
      }

      clearForm();
      onCreateSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Error saving carousel item.");
    }
  };

  return (
    <div className="carousel-form__container">
      <form className="carousel-form" onSubmit={handleSubmit}>
        <div className="carousel-form__item">
          <h3 className="carousel-form__title">
            {initialData ? "Edit Carousel Item" : "Create Carousel Item"}
          </h3>
          <div className="carousel-form__row">
            <div className="carousel-form__field-inline">
              <label
                htmlFor="carousel-title"
                className="carousel-form__label-inline"
              >
                Title:
              </label>
              <input
                id="carousel-title"
                name="title"
                type="text"
                className="carousel-form__input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="carousel-form__field-inline">
              <label
                htmlFor="carousel-type"
                className="carousel-form__label-inline"
              >
                Carousel Type:
              </label>
              <select
                id="carousel-type" // matches htmlFor
                name="carouselType" // optional but good practice
                className="carousel-form__select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="basic">Basic</option>
                <option value="thumbs">Thumbnails</option>
                <option value="multi-row">Multi-Row</option>
              </select>
            </div>
          </div>
        </div>
        <div className="carousel-form__item">
          <h4 className="carousel-form__title">Live Preview</h4>
          <div className="carousel-form__preview">
            <CarouselLivePreview type={type} images={images} />
          </div>

          <div className="carousel-form__images">
            <ImageSelector
              onSelect={(imageObj) =>
                setImages((prev) => [
                  ...prev,
                  `${API_BASE_URL}/uploads/${imageObj.filename}`,
                ])
              }
            />

            {images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginTop: "1rem",
                }}
              >
                {images.map((url, index) => (
                  <div key={index} className="carousel-form__image-wrapper">
                    <img
                      src={url}
                      alt={`Selected ${index + 1}`}
                      style={{ width: "100px", borderRadius: "6px" }}
                    />
                    <Button
                      className="carousel-form__button"
                      type="button"
                      variant="delete-image"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      ✖
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button type="submit" variant="primary">
          Save
        </Button>
      </form>
    </div>
  );
}
