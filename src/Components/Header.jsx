import React from "react";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="header">
      <div className="header-words">
        <h1 id="title">~ Gifter ~</h1>
        <h5 id="subtitle">The Perfect Gift Finder</h5>
      </div>
      <Navigation />
    </div>
  );
}
