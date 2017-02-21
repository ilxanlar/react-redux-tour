import React from "react";

export default ({ label, primary, className, ...props }) => (
  <button className={`tour-button tour-button-${primary ? 'primary' : 'secondary'} ${className}`} {...props}>
    {label}
  </button>
);
