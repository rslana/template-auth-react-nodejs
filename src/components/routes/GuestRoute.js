import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isAuthenticated } from "../../actions/auth";

const GuestRoute = ({ isAuthenticated, token, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated(token) ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string
};

function mapStateToProps(state) {
  return {
    token: state.user.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    isAuthenticated,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);
