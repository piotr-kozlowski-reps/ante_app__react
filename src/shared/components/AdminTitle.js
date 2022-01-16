import React from "react";
import PropTypes from "prop-types";

const AdminTitle = ({ title }) => {
  return (
    <div className="container">
      <div className="row py-admin">
        <div className="col-lg-12">
          <h2 className="text-center">{title}</h2>
        </div>
      </div>
    </div>
  );
};

AdminTitle.propTypes = {
  title: PropTypes.string,
};

export default AdminTitle;
