//frontend/src/components/UI/Button.jsx

import "./Button.css";

export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button type="button" className={`btn btn--${variant}`} {...props}>
      {children}
    </button>
  );
}
