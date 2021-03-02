import React from "react";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="header">
      <h1 id="title">Welcome to Gifter! (V2)</h1>
      <h5 id="subtitle">
        Time to find that thing you have been searching for...
      </h5>
      <Navigation />
    </div>
  );
}
