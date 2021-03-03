import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Navigation() {
  return (
    <div className="nav-container">
      <Navbar className="navbar">
        <Nav className="justify-content-end">
          <Nav.Item>
            <Link className="link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="link" to="/gifts">
              All Gifts
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="link" to="/suggestion">
              Suggest a Gift
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="link" to="/suggested">
              All Suggestions
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* </Navbar> */}
    </div>
  );
}
