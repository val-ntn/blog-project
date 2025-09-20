// frontend/src/components/Images-Carousels/PictureList.jsx

import { API_BASE_URL } from "../../utils/api";
import Picture from "./Picture";
import PropTypes from "prop-types";

export default function PicturesList({
  images,
  uploading,
  onUpload,
  onDelete,
  onSelect,
  viewMode,
  showCopyButton,
}) {
  return (
    <>
      {onUpload && (
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
        />
      )}
      {uploading && <p>Uploading...</p>}

      {viewMode === "list" ? (
        <table>
          <tbody>
            {images.map((image) => (
              <Picture
                key={image.filename}
                image={image}
                onSelect={onSelect}
                onDelete={onDelete}
                mode="list"
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {images.map((image) => (
            <Picture
              //key={image.name}
              key={image.filename}
              image={image}
              onSelect={onSelect}
              onDelete={onDelete}
              mode="grid"
              showCopyButton={showCopyButton}
            />
          ))}
        </div>
      )}
    </>
  );
}

PicturesList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      originalName: PropTypes.string,
      mimetype: PropTypes.string,
      size: PropTypes.number,
    })
  ).isRequired,
  uploading: PropTypes.bool, // Whether upload is in progress
  onUpload: PropTypes.func, // Callback for file input change
  onDelete: PropTypes.func, // Callback to delete an image
  onSelect: PropTypes.func, // Callback when image is selected
  viewMode: PropTypes.oneOf(["list", "grid"]), // Determines rendering layout
  showCopyButton: PropTypes.bool, // Show "Copy URL" button on thumbnails
};

PicturesList.defaultProps = {
  uploading: false,
  onUpload: null,
  onDelete: null,
  onSelect: null,
  viewMode: "grid",
  showCopyButton: false,
};
