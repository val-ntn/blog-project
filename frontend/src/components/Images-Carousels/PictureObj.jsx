// frontend/src/components/Images-Carousels/PictureObj.jsx

import { API_BASE_URL } from "../../utils/api";
export default function Picture({
  image,
  onSelect,
  onDelete,
  mode,
  showCopyButton,
}) {
  const imageUrl = `${API_BASE_URL}/uploads/${image.filename}`;

  if (mode === "list") {
    // existing list code
  }

  if (mode === "thumbnail") {
    return (
      <div style={{ width: 32, height: 32, position: "relative" }}>
        <img
          src={imageUrl}
          style={{ width: 32, height: 32, objectFit: "cover" }}
          onClick={() => onSelect?.(image)}
        />
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(image.filename);
            }}
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: 10,
              width: 16,
              height: 16,
              lineHeight: "16px",
              padding: 0,
            }}
          >
            ❌
          </button>
        )}
      </div>
    );
  }

  if (mode === "preview") {
    return (
      <img
        src={imageUrl}
        style={{ maxWidth: "100%", maxHeight: 280, borderRadius: 6 }}
        onClick={() => onSelect?.(image)}
      />
    );
  }

  // fallback for grid / old mode
  return (
    <div style={{ position: "relative", textAlign: "center", width: 100 }}>
      <img
        src={imageUrl}
        style={{ width: 100 }}
        onClick={() => onSelect?.(image)}
      />
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(image.filename)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "red",
            color: "white",
          }}
        >
          X
        </button>
      )}
      {showCopyButton && (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(imageUrl)}
          style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}
        >
          Copy URL
        </button>
      )}
    </div>
  );
}
