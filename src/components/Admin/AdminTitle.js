import React from "react";
import PropTypes from "prop-types";

const AdminTitle = ({ title }) => {
  return (
    <div id="the-sticky-div" className="container">
      <div className="container">
        <div className="row py-admin">
          <div className="col-lg-12">
            <h2 className="text-center">{title}</h2>
          </div>
          <div className="col-lg-12">
            <h2 className="navbar-collapse" style={{ height: "15px" }}></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminTitle.propTypes = {
  title: PropTypes.string,
};

export default AdminTitle;
