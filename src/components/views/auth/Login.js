import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuHorizontal from "../../layouts/MenuHorizontal";
import FormLogin from "../../forms/FormLogin";
import FormRecuperacaoSenha from "../../forms/FormRecuperacaoSenha";
import { login, enviarEmailRecuperacaoSenha } from "../../../actions/auth";
import { Card, Transition, Container } from "semantic-ui-react";

class Login extends Component {
  state = {
    pagina: true
  };

  componentDidMount = () => {
    if (this.props.match.params.action)
      (this.props.match.params.action === "recuperar-senha") ? this.setState({ pagina: false }) : this.props.history.push("/login");
  }

  submitLogin = data =>
    this.props.login(data.email, data.senha).then(() => this.props.history.push(this.props.redirect));

  submitEnviarEmailRecuperacaoSenha = data =>
    this.props.enviarEmailRecuperacaoSenha(data.email);

  submitRecuperarSenha = data =>
    this.props.recuperarSenha(data)
      .then(usuario => usuario);

  trocaPagina = () => {
    this.setState({ pagina: !this.state.pagina })
  }

  render() {
    const { pagina } = this.state;
    return (
      <div>
        <MenuHorizontal activeItem={"login"} />
        <div className="pagina-login">
          <Container>
            <Transition animation="horizontal flip" duration={{ show: 800, hide: 0 }} visible={true} transitionOnMount={true}>
              <Card fluid style={styles.card} className="card-auth" color="blue">
                <Card.Content>
                  <Card.Header style={styles.header}>
                    <div>
                      <img src="/react-logo.svg" width="48" alt="Logo" />
                      <p style={styles.titulo}>Template</p>
                    </div>
                    <Transition duration={{ show: 600, hide: 0 }} animation="fly left" visible={pagina}>
                      <div>
                        <span>Login</span>
                        <Transition duration={{ show: 600, hide: 0 }} animation="fly left" visible={this.props.redirect !== "/"}>
                          <span style={styles.messageRedirect}>Você precisa estar logado para acessar essa página</span>
                        </Transition>
                        <Transition duration={{ show: 1000, hide: 0 }} animation="fly left" visible={!!!localStorage.tokenExpired} transitionOnMount={true}>
                          <span style={styles.messageRedirect} className="erro-inline text-center">{localStorage.tokenExpired}</span>
                        </Transition>
                      </div>
                    </Transition>
                    <Transition duration={{ show: 600, hide: 0 }} animation="fly left" visible={!pagina}>
                      <span>Esqueci minha senha</span>
                    </Transition>
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  {(pagina) ?
                    <FormLogin submit={this.submitLogin} />
                    :
                    <FormRecuperacaoSenha submit={this.submitEnviarEmailRecuperacaoSenha} />
                  }
                </Card.Content>
                <Card.Content>
                  <Transition duration={{ show: 600, hide: 0 }} animation="fly left" visible={pagina}>
                    <div style={styles.cardLink} onClick={this.trocaPagina}>
                      Esqueci minha senha
                    </div>
                  </Transition>
                  <Transition duration={{ show: 600, hide: 0 }} animation="fly left" visible={!pagina}>
                    <div style={styles.cardLink} onClick={this.trocaPagina}>
                      Fazer Login
                    </div>
                  </Transition>
                </Card.Content>
              </Card>
            </Transition>
          </Container>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  redirect: "/"
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  redirect: PropTypes.string,
  enviarEmailRecuperacaoSenha: PropTypes.func.isRequired
}

const styles = {
  titulo: {
    fontSize: "20px",
    fontWeight: 100,
    padding: "10px"
  },
  header: {
    padding: "10px 10px",
    textAlign: "center",
  },
  card: {
    padding: "5px 15px 0px 15px",
    margin: "auto",
    marginBottom: "40px",
    marginTop: "80px",
    overflow: "hidden",
    maxWidth: "440px"
  },
  cardLink: {
    fontSize: "13px",
    color: "#2185e0",
    cursor: "pointer",
    textAlign: "center"
  },
  messageRedirect: {
    fontSize: "11px",
    fontWeight: 100,
    marginTop: "8px",
  },
}

export default connect(null, { login, enviarEmailRecuperacaoSenha })(Login);
