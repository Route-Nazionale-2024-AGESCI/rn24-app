import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CustomPin({ icon, color }) {
  return (
    <>
      <div
        style={{ backgroundColor: `${color ? color : "orange"}` }}
        className="marker-pin"
      ></div>
      {Boolean(icon) && (
        <i className="marker-custom-icon">
          <FontAwesomeIcon icon={["fas", icon]} style={{ color: `${color ? color : "orange"}` }} />
        </i>
      )}
    </>
  );
}
