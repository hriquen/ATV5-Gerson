/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

interface NavLink {
  label: string;
  path: string;
}

interface NavbarProps {
  links: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* GitLab icon and PetLovers text */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <i className="bi bi-gitlab" style={{ fontSize: '30px' }}></i> {/* GitLab icon */}
          <span className="ms-2" style={{ fontSize: '22px' }}>PetLovers</span> {/* PetLovers text */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span> {/* Hamburger icon */}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Align links to the right */}
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <Link 
                  className="nav-link text-white ms-3" // Add margin to the right of each link
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 