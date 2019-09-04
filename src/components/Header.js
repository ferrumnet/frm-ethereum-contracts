/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Header = ({
  history: {
    location: { pathname }
  }
}) => {
  const isAdmin = pathname.match(/admin/g) ? true : false;

  const activeStyle = { color: "#FFFFFF" };
  return (
    <header>
      <nav className="navbar  navbar-expand-lg navbar-dark py-4 bg-dark">
        <NavLink className="navbar-brand" to="/">
          Ferrum Contracts
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto ">
            {isAdmin && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    exact
                    to="/admin/deploy"
                    activeStyle={activeStyle}
                  >
                    Deploy
                  </NavLink>
                </li>

            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink-4"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i> Account
              </a>
              <div
                className="dropdown-menu dropdown-menu-right p-2"
                aria-labelledby="navbarDropdownMenuLink-4"
              >
                <NavLink
                  className="dropdown-item"
                  exact
                  to="/admin/deploy"
                  activeStyle={activeStyle}
                >
                  Admin
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  exact
                  to="/"
                  activeStyle={activeStyle}
                >
                  Customer
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default withRouter(Header);
