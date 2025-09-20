// src/components/Posts/PostItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";
import PropTypes from "prop-types";
import "./Posts.css";

/**
 * PostItem displays a post in "small", "medium", or "large" size.
 * - "small": shows excerpt + "read more"
 * - "medium": full content
 * - "large": full content + optional carousel
 */
export default function PostItem({
  post,
  size = "medium",
  linkToDetail = false,
}) {
  let contentToRender;
  let showReadMore = false;
  let showCarousel = false;
  //let sizeClass = "";

  switch (size) {
    case "small":
      contentToRender = post.excerpt;
      showReadMore = true;
      //sizeClass = "post-item--small";
      break;
    case "large":
      contentToRender = post.content;
      showCarousel = true;
      //sizeClass = "post-item--large";
      break;
    case "medium":
    default:
      contentToRender = post.content;
    //sizeClass = "post-item--medium";
  }

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`post-item post-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{post.title}</h3>
        {/*<div className={`post-item ${sizeClass}`}>
      <h3 className="card__title">{post.title}</h3>*/}

        {/* Safe HTML content */}
        <SafeHTMLRenderer content={contentToRender} />

        {/* "Read more" link for small posts */}
        {showReadMore && linkToDetail && (
          <div className="post-item__read-more">
            <Link to={`/posts/${getId(post._id)}`} className="card__read-more">
              Read More
            </Link>
          </div>
        )}

        {/* Carousel for large posts */}
        {showCarousel && post.carousel && (
          <div className="post-item__carousel">
            <CarouselItem carousel={post.carousel} />
          </div>
        )}

        {/* Meta info */}
        {post.author?.name && (
          <small className="card__meta">By: {post.author.name}</small>
        )}
      </div>
    </div>
  );
}
PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $oid: PropTypes.string }),
    ]).isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.string,
    carousel: PropTypes.object, // adjust shape if you know carousel structure
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  linkToDetail: PropTypes.bool,
};
