import React, { Component } from 'react';
import PerfilUsuario from "../../views/usuario/Perfil";

class Perfil extends Component {
  render() {
    return <PerfilUsuario {...this.props} />
  }
}

export default Perfil;