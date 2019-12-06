import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuHorizontal from "../../layouts/MenuHorizontal";
import { Container } from "semantic-ui-react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errors: {},
    };
  }

  render() {
    return (
      <div>
        <MenuHorizontal />
        <Container style={{ marginTop: "30px" }}>
          <h2> Dashboard</h2>

          <Link to="/ingredientes">Ingredientes</Link><br />
          <Link to="/ingrediente/cadastrar">Cadastrar Ingrediente</Link>

        </Container>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);