/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
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
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/"
                activeStyle={activeStyle}
              >
                Reward
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/stake"
                activeStyle={activeStyle}
              >
                Stake
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/withdraw"
                activeStyle={activeStyle}
              >
                Withdraw
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/deploy"
                activeStyle={activeStyle}
              >
                Deploy
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
