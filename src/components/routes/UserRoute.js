import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isAuthenticated } from "../../actions/auth";
import Home from "../views/Home";
import Login from "../views/auth/Login";

const UserRoute = ({ isAuthenticated, tipo, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ?
          <Component {...props} tipoUsuario={tipo} />
          :
          (rest.location.pathname === "/") ?
            <Home {...props} />
            :
            <Login {...props} redirect={rest.location.pathname} />
      }
    />
  )
};

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  token: PropTypes.string
};

function mapStateToProps(state) {
  return {
    tipo: (state.user.user) ? state.user.user.tipo : null
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    isAuthenticated,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);
