// frontend/src/components/Images-Carousels/PictureListObj.jsx

import PropTypes from "prop-types";
import { API_BASE_URL } from "../../utils/api";
import Picture from "./PictureObj";

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
    })
  ).isRequired,
  uploading: PropTypes.bool, // Whether an upload is in progress
  onUpload: PropTypes.func, // Optional callback when uploading a file
  onDelete: PropTypes.func, // Optional callback to delete an image
  onSelect: PropTypes.func, // Optional callback when selecting an image
  viewMode: PropTypes.oneOf(["list", "grid"]), // List or grid display
  showCopyButton: PropTypes.bool, // Show "Copy URL" button for grid mode
};

PicturesList.defaultProps = {
  uploading: false,
  onUpload: null,
  onDelete: null,
  onSelect: null,
  viewMode: "grid",
  showCopyButton: false,
};
