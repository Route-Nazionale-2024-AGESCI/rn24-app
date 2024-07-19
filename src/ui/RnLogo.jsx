import * as React from "react";
import { Link } from "react-router-dom";

export default function RnLogo() {
  return (
    <Link to="/">
      <img
        alt="Logo Route Nazionale 2024"
        src="/256_transparent.png"
        width={40}
        height={40}
      />
    </Link>
  );
}
