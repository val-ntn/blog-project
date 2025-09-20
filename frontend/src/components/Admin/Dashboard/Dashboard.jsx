// src/components/Admin/Dashboard.jsx

import { useState } from "react";
import RecycleBin from "./RecycleBin";
import PostListControl from "./Controls/PostListControl";
import EventListControl from "./Controls/EventListControl";
import CarouselListControl from "./Controls/CarouselListControl";
import DashboardSidebar from "./DashboardSidebar";
import PostForm from "../Forms/PostForm/PostForm";
import EventForm from "../Forms/EventForm/EventForm";
import CarouselForm from "../Forms/CarouselForm/CarouselFormObj";
import PicturesListControl from "./Controls/PicturesListControl";
import PictureDisplayControl from "./Controls/PictureDisplayControl";
import CarouselDisplayControl from "./Controls/CarouselDisplayControl";
import ReportListControl from "./Controls/ReportListControl";
import ReportForm from "../Forms/ReportForm/ReportForm";
import DashboardHeader from "./DashboardHeader";
import PropTypes from "prop-types";
import "./dashboard.css";

export default function Dashboard() {
  // === SECTION CONTROL ===
  const [selectedSection, setSelectedSection] = useState("posts");

  // === POSTS ===
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);

  // === EVENTS ===
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  // === REPORTS ===
  const [reportRefreshFlag, setReportRefreshFlag] = useState(false);
  const [reportRecycleRefreshFlag, setReportRecycleRefreshFlag] =
    useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);

  // === CAROUSELS ===
  const [carouselRefreshFlag, setCarouselRefreshFlag] = useState(0);
  const [carouselRecycleRefreshFlag, setCarouselRecycleRefreshFlag] =
    useState(false);
  const [showCarouselForm, setShowCarouselForm] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);

  // === IMAGES ===
  const [imageRecycleRefreshFlag, setImageRecycleRefreshFlag] = useState(false);

  // === REFRESH TRIGGERS ===
  const triggerPostRefresh = () => setPostRefreshFlag((prev) => !prev);
  const triggerPostRecycleRefresh = () =>
    setPostRecycleRefreshFlag((prev) => !prev);

  const triggerEventRefresh = () => setEventRefreshFlag((prev) => !prev);
  const triggerEventRecycleRefresh = () =>
    setEventRecycleRefreshFlag((prev) => !prev);

  const triggerReportRefresh = () => setReportRefreshFlag((prev) => !prev);
  const triggerReportRecycleRefresh = () =>
    setReportRecycleRefreshFlag((prev) => !prev);

  const triggerCarouselRecycleRefresh = () =>
    setCarouselRecycleRefreshFlag((prev) => !prev);

  const triggerImageRecycleRefresh = () =>
    setImageRecycleRefreshFlag((prev) => !prev);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <DashboardSidebar
          selected={selectedSection}
          onSelect={setSelectedSection}
        />
        <div className="dashboard-main">
          <DashboardHeader />
          <div className="dashboard-content">
            {/* === Posts Section === */}

            {selectedSection === "posts" && (
              <>
                <h1 className="dashboard__section-title">Posts</h1>
                {!showPostForm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPost(null);
                        setShowPostForm(true);
                      }}
                    >
                      Create New Post
                    </button>

                    <PostListControl
                      refreshFlag={postRefreshFlag}
                      onRefresh={triggerPostRefresh}
                      onRecycleRefresh={triggerPostRecycleRefresh}
                      onEdit={(post) => {
                        setEditingPost(post);
                        setShowPostForm(true);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <PostForm
                      initialData={editingPost}
                      onCreateSuccess={() => {
                        setShowPostForm(false);
                        setEditingPost(null);
                        triggerPostRefresh();
                      }}
                    />
                    <button
                      className="button--cancel"
                      type="button"
                      onClick={() => {
                        setShowPostForm(false);
                        setEditingPost(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
            {/* === Events Section === */}
            {selectedSection === "events" && (
              <>
                <h1 className="dashboard__section-title">Events</h1>
                {!showEventForm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setShowEventForm(true);
                      }}
                    >
                      Create New Event
                    </button>

                    <EventListControl
                      refreshFlag={eventRefreshFlag}
                      onRefresh={triggerEventRefresh}
                      onRecycleRefresh={triggerEventRecycleRefresh}
                      onEdit={(event) => {
                        setEditingEvent(event);
                        setShowEventForm(true);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <EventForm
                      initialData={editingEvent}
                      onCreateSuccess={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                        triggerEventRefresh();
                      }}
                    />
                    <button
                      className="button--cancel"
                      type="button"
                      onClick={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
            {/* === Reports Section === */}
            {selectedSection === "reports" && (
              <>
                <h1 className="dashboard__section-title">Reports</h1>
                {!showReportForm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReport(null);
                        setShowReportForm(true);
                      }}
                    >
                      Create New Report
                    </button>

                    <ReportListControl
                      refreshFlag={reportRefreshFlag}
                      onRefresh={triggerReportRefresh}
                      onRecycleRefresh={triggerReportRecycleRefresh}
                      onEdit={(report) => {
                        setEditingReport(report);
                        setShowReportForm(true);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ReportForm
                      initialData={editingReport}
                      onCreateSuccess={() => {
                        setShowReportForm(false);
                        setEditingReport(null);
                        triggerReportRefresh();
                      }}
                    />
                    <button
                      className="button--cancel"
                      type="button"
                      onClick={() => {
                        setShowReportForm(false);
                        setEditingReport(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
            {/* === Pictures & Carousels Section === */}
            {selectedSection === "pictures" && (
              <>
                <div>
                  <h1 className="dashboard__section-title">Pictures</h1>
                  <PictureDisplayControl />

                  <CarouselDisplayControl />
                </div>
              </>
            )}
            {/* === Recycle Bin Section === */}
            {selectedSection === "bin" && (
              <>
                <h1 className="dashboard__section-title">Recycle Bin</h1>
                <RecycleBin
                  //onPostRestore={triggerPostRefresh}
                  onPostRestore={triggerPostRecycleRefresh}
                  onEventRestore={triggerEventRecycleRefresh}
                  onReportRestore={triggerReportRecycleRefresh}
                  onCarouselRestore={triggerCarouselRecycleRefresh}
                  onImageRestore={triggerImageRecycleRefresh}
                  postRecycleRefreshFlag={postRecycleRefreshFlag}
                  eventRecycleRefreshFlag={eventRecycleRefreshFlag}
                  carouselRecycleRefreshFlag={carouselRecycleRefreshFlag}
                  reportRecycleRefreshFlag={reportRecycleRefreshFlag}
                  imageRecycleRefreshFlag={imageRecycleRefreshFlag}
                />
              </>
            )}
            {/* === Users Section Placeholder === */}
            {selectedSection === "users" && (
              <>
                <h1 className="dashboard__section-title">Users</h1>
                <div className="dashboard-content--text">
                  User management coming soon...
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
