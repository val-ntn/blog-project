// src/components/Admin/Dashboard/EntitySection.jsx

import PropTypes from "prop-types";

export default function EntitySection({
  title,
  listComponent: ListComponent,
  formComponent: FormComponent,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
}) {
  const singularTitle = title.endsWith("s") ? title.slice(0, -1) : title;

  return (
    <div className="dashboard-entity-section">
      <h1 className="dashboard__section-title">{title}</h1>

      <button
        type="button"
        onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditingItem(null);
          } else {
            setEditingItem(null);
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Close" : `Create New ${singularTitle}`}
      </button>

      {showForm ? (
        <FormComponent
          initialData={editingItem}
          onCreateSuccess={() => {
            setShowForm(false);
            setEditingItem(null);
            onRefresh();
          }}
        />
      ) : (
        <ListComponent
          refreshFlag={refreshFlag}
          onRefresh={onRefresh}
          onRecycleRefresh={onRecycleRefresh}
          onEdit={(item) => {
            setEditingItem(item);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}

EntitySection.propTypes = {
  title: PropTypes.string.isRequired,
  listComponent: PropTypes.elementType.isRequired,
  formComponent: PropTypes.elementType.isRequired,
  showForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
  editingItem: PropTypes.object,
  setEditingItem: PropTypes.func.isRequired,
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onRefresh: PropTypes.func.isRequired,
  onRecycleRefresh: PropTypes.func.isRequired,
};
