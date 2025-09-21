// src/components/Admin/Dashboard.jsx

import { useState } from "react";
import RecycleBin from "./RecycleBin";
import PostListControl from "./Controls/PostListControl";
import EventListControl from "./Controls/EventListControl";
import ReportListControl from "./Controls/ReportListControl";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import PostForm from "../Forms/PostForm/PostForm";
import EventForm from "../Forms/EventForm/EventForm";
import ReportForm from "../Forms/ReportForm/ReportForm";

import PictureDisplayControl from "./Controls/PictureDisplayControl";
import CarouselDisplayControl from "./Controls/CarouselDisplayControl";

import EntitySection from "./EntitySection"; // <-- new

import "./dashboard.css";

export default function Dashboard() {
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

  // === CAROUSELS & IMAGES ===
  const [carouselRecycleRefreshFlag, setCarouselRecycleRefreshFlag] =
    useState(false);
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
            {selectedSection === "posts" && (
              <EntitySection
                title="Posts"
                listComponent={PostListControl}
                formComponent={PostForm}
                showForm={showPostForm}
                setShowForm={setShowPostForm}
                editingItem={editingPost}
                setEditingItem={setEditingPost}
                refreshFlag={postRefreshFlag}
                onRefresh={triggerPostRefresh}
                onRecycleRefresh={triggerPostRecycleRefresh}
              />
            )}

            {selectedSection === "events" && (
              <EntitySection
                title="Events"
                listComponent={EventListControl}
                formComponent={EventForm}
                showForm={showEventForm}
                setShowForm={setShowEventForm}
                editingItem={editingEvent}
                setEditingItem={setEditingEvent}
                refreshFlag={eventRefreshFlag}
                onRefresh={triggerEventRefresh}
                onRecycleRefresh={triggerEventRecycleRefresh}
              />
            )}

            {selectedSection === "reports" && (
              <EntitySection
                title="Reports"
                listComponent={ReportListControl}
                formComponent={ReportForm}
                showForm={showReportForm}
                setShowForm={setShowReportForm}
                editingItem={editingReport}
                setEditingItem={setEditingReport}
                refreshFlag={reportRefreshFlag}
                onRefresh={triggerReportRefresh}
                onRecycleRefresh={triggerReportRecycleRefresh}
              />
            )}

            {selectedSection === "pictures" && (
              <>
                <h1 className="dashboard__section-title">Pictures</h1>
                <PictureDisplayControl />
                <CarouselDisplayControl />
              </>
            )}

            {selectedSection === "bin" && (
              <>
                <h1 className="dashboard__section-title">Recycle Bin</h1>
                <RecycleBin
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
