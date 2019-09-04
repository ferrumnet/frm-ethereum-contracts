import React from "react";

const Loader = ({ complete }) => (
  <div className="min-component-height top-padding">
    <div className="card custom-loader">
      <div className={`circle-loader ${complete && "load-complete"}`}>
        <div className={`${complete && "checkmark draw"}`}></div>
      </div>
    </div>
  </div>
);

export default Loader;
