import React, { Component } from 'react';
import DashboardUsuario from "../views/usuario/Dashboard";

class Dashboard extends Component {
  render() {
    return <DashboardUsuario {...this.props} />
  }
}

export default Dashboard;