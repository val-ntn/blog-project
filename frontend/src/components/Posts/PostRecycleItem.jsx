//src/components/Posts/PostRecycleItem.jsx
import PropTypes from "prop-types";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../Images-Carousels/CarouselItem";

export default function PostRecycleItem({ post, size = "medium" }) {
  let contentToRender = null;
  let showCarousel = false;

  switch (size) {
    case "large":
      contentToRender = post.content;
      showCarousel = !!post.carousel;
      break;
    case "small":
    default:
      contentToRender = null; // only title
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`post-item post-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{post.title}</h3>
        {contentToRender && <SafeHTMLRenderer content={contentToRender} />}
        {showCarousel && <CarouselItem carousel={post.carousel} />}
        {post.author?.name && (
          <small className="card__meta">By: {post.author.name}</small>
        )}
      </div>
    </div>
  );
}

PostRecycleItem.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
