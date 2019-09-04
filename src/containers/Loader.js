import React from "react";
import { connect } from "react-redux";
import IconLoader from "../components/common/Loader";

export const Loader = ({ loading }) =>
  loading ? (
    <div className="ui-loader">
      <IconLoader />
    </div>
  ) : null;

const mapStateToProps = ({ contract }) => ({
  loading: contract.loading
});

export default connect(
  mapStateToProps,
  null
)(Loader);
