import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Navigation() {
  return (
    <div className="nav-container">
      <h4>Explore</h4>
      <Nav className="justify-content-end">
        <Nav.Item>
          <Link className="link" to="/">
            Home
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="link" to="/gifts">
            Full List of Gifts
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="link" to="/suggestion">
            Suggest a Gift
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="link" to="/suggested">
            List of Suggestions
          </Link>
        </Nav.Item>
      </Nav>
      {/* </Navbar> */}
    </div>
  );
}
