import React from "react";
import { NavLink } from "react-router-dom";
const NotFound = ({minPage = false, message="Oooops! Page Not Found"}) => (
  <div className={`center-content text-center ${minPage?"component-height":"min-component-height"}`}>
    <div>
      <h1>{message}</h1>
      <br />
      <NavLink to="/" className="btn btn-primary">
        {" "}
        Go Back
      </NavLink>
    </div>
  </div>
);

export default NotFound;
