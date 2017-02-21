import React from "react";

export default ({ offset, dimensions }) => {
  return (
    <div
      id="tour-overlay"
      style={{
        height: dimensions.height,
        left: offset.left,
        top: offset.top,
        width: dimensions.width
      }}
    />
  );
};
