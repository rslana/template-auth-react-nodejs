import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuHorizontal from "../../layouts/MenuHorizontal";
import { Container, Icon } from "semantic-ui-react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errors: {},
    };
  }

  render() {
    const { usuario } = this.props;
    return (
      <div>
        <MenuHorizontal />
        <Container style={{ marginTop: "30px" }}>
          <h2><Icon name="user circle outline" />Perfil</h2>
          <h3>{usuario.nome}</h3>
          <h3>{usuario.email}</h3>
          {(usuario.ativo) ?
            <h3><Icon name="check" color="green" /> Usuário Ativo</h3>
            :
            <h3><Icon name="lock" color="red" /> Usuário Inativo</h3>
          }
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