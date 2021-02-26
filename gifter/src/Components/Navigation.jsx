import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="nav">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/list">
        List of Gifts
      </Link>
    </div>
  );
}
