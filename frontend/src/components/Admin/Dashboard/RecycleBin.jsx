// src/components/Admin/Dashboard/RecycleBin.jsx

import { useState } from "react";
import CarouselRecycleControl from "./Controls/CarouselRecycleControl";
import EventRecycleControl from "./Controls/EventRecycleControl";
import ReportRecycleControl from "./Controls/ReportRecycleControl";
import PostRecycleControl from "./Controls/PostRecycleControl";
import PictureRecycleControl from "./Controls/PictureRecycleControl";
import PropTypes from "prop-types";
//import ReportRecycleList from "../../Reports/ReportRecycleList";
//import PictureRecycleList from "../../Images-Carousels/PictureRecycleList";

export default function RecycleBin({
  onPostRestore,
  onEventRestore,
  onCarouselRestore,
  onReportRestore,
  onImageRestore,
  postRecycleRefreshFlag,
  eventRecycleRefreshFlag,
  carouselRecycleRefreshFlag,
  reportRecycleRefreshFlag,
  imageRecycleRefreshFlag,
}) {
  const [filter, setFilter] = useState("all");

  return (
    <div className="recycle-bin">
      <div className="recycle-bin__filter-bar">
        <button type="button" onClick={() => setFilter("all")}>
          All
        </button>
        <button type="button" onClick={() => setFilter("post")}>
          Posts
        </button>
        <button type="button" onClick={() => setFilter("event")}>
          Events
        </button>
        <button type="button" onClick={() => setFilter("report")}>
          Reports
        </button>
        <button type="button" onClick={() => setFilter("carousel")}>
          Carousels
        </button>
        <button type="button" onClick={() => setFilter("image")}>
          Images
        </button>
      </div>
      <div className="recycle-bin__content">
        {filter === "post" && (
          <PostRecycleControl
            refreshFlag={postRecycleRefreshFlag}
            onRestore={onPostRestore}
          />
        )}
        {filter === "event" && (
          <EventRecycleControl
            onRestore={onEventRestore}
            refreshFlag={eventRecycleRefreshFlag}
          />
        )}
        {filter === "report" && (
          <ReportRecycleControl
            onRestore={onReportRestore}
            refreshFlag={reportRecycleRefreshFlag}
          />
        )}
        {filter === "carousel" && (
          <CarouselRecycleControl
            onRestore={onCarouselRestore}
            refreshFlag={carouselRecycleRefreshFlag}
          />
        )}
        {filter === "image" && (
          <PictureRecycleControl
            onRestore={onImageRestore}
            refreshFlag={imageRecycleRefreshFlag}
          />
        )}
        {filter === "all" && (
          <>
            <PostRecycleControl
              onRestore={onPostRestore}
              refreshFlag={postRecycleRefreshFlag}
            />

            <EventRecycleControl
              onRestore={onEventRestore}
              refreshFlag={eventRecycleRefreshFlag}
            />
            <ReportRecycleControl
              onRestore={onReportRestore}
              refreshFlag={reportRecycleRefreshFlag}
            />
            <CarouselRecycleControl
              onRestore={onCarouselRestore}
              refreshFlag={carouselRecycleRefreshFlag}
            />

            <PictureRecycleControl
              onRestore={onImageRestore}
              refreshFlag={imageRecycleRefreshFlag}
            />
          </>
        )}
      </div>
    </div>
  );
}

RecycleBin.propTypes = {
  onPostRestore: PropTypes.func,
  onEventRestore: PropTypes.func,
  onCarouselRestore: PropTypes.func,
  onReportRestore: PropTypes.func,
  onImageRestore: PropTypes.func,
  postRecycleRefreshFlag: PropTypes.any, // usually a number or boolean
  eventRecycleRefreshFlag: PropTypes.any,
  carouselRecycleRefreshFlag: PropTypes.any,
  reportRecycleRefreshFlag: PropTypes.any,
  imageRecycleRefreshFlag: PropTypes.any,
};
