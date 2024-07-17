import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CustomPin({ icon, color, big }) {
  return (
    <>
      <div
        style={{ backgroundColor: `${color ? color : "orange"}` }}
        className={`marker-pin${big ? " marker-pin-big" : ""}`}
      ></div>
      {Boolean(icon) && (
        <i className={`marker-custom-icon${big ? " marker-custom-icon-big" : ""}`}>
          <FontAwesomeIcon icon={["fas", icon]} style={{ color: `${color ? color : "orange"}` }} />
        </i>
      )}
    </>
  );
}
