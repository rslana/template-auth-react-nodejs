import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuHorizontal from "../../layouts/MenuHorizontal";
import FormRecuperacaoSenha from "../../forms/FormRecuperacaoSenha";
import { recuperarSenha, confirmarTokenRecuperacaoSenha } from "../../../actions/auth";
import { Card, Container } from "semantic-ui-react";

class RecuperacaoSenha extends Component {
  state = {
    pagina: true
  };

  submitLogin = data =>
    this.props.login(data.email, data.senha).then(() => this.props.history.push("/"));

  submitEnviarEmailRecuperacaoSenha = data =>
    this.props.enviarEmailRecuperacaoSenha(data.email);

  submitRecuperarSenha = data =>
    this.props.recuperarSenha(data)
      .then(usuario => usuario);

  confirmarTokenRecuperacaoSenha = token =>
    this.props.confirmarTokenRecuperacaoSenha(token)
      .then(usuario => usuario);

  render() {
    return (
      <div>
        <MenuHorizontal activeItem={"Login"} />
        <Container style={{ marginTop: "30px" }}>
          <Card fluid style={styles.card} className="card-auth">
            <Card.Content>
              <Card.Header className="text-center" style={styles.header}>
                <div style={styles.divTitulo}>
                  <img src="/react-logo.svg" width="48" alt="Logo" />
                  <p style={styles.titulo}>Template</p>
                </div>
                <span>Recuperação de senha</span>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <FormRecuperacaoSenha submit={this.submitRecuperarSenha} confirmarToken={this.confirmarTokenRecuperacaoSenha} token={this.props.match.params.token} />
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

RecuperacaoSenha.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tipoUsuario: PropTypes.string
    }).isRequired
  }).isRequired,
  recuperarSenha: PropTypes.func.isRequired,
  confirmarTokenRecuperacaoSenha: PropTypes.func.isRequired
};

const styles = {
  titulo: {
    fontSize: "20px",
    fontWeight: 100,
    padding: "10px"
  },
  header: {
    padding: "10px 10px",
    textAlign: "center"
  },
  card: {
    padding: "10px 15px 0px 15px",
    margin: "auto",
    marginBottom: "40px",
    overflow: "hidden",
    maxWidth: "400px"
  },
  cardLink: {
    fontSize: "13px"
  }
}

export default connect(null, { recuperarSenha, confirmarTokenRecuperacaoSenha })(RecuperacaoSenha);
