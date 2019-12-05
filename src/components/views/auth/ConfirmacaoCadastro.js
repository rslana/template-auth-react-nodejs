import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Container, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmarCadastro } from "../../../actions/auth";

class ConfirmacaoCadastro extends Component {
  state = {
    loading: true,
    success: false,
    error: null
  };

  componentDidMount = async () => {
    try {
      await this.props.confirmarCadastro(this.props.match.params.token);
      this.setState({ loading: false, success: true });
    } catch (err) {
      this.setState({ loading: false, success: false, error: err.data.error });
    }
  }

  render() {
    const { loading, success, error } = this.state;
    return (
      <Container>
        {loading && (
          <Message style={styles.message}>
            <Message.Content>
              <a href="#home" onClick={this.handleScroll}><img href="#home" src="/react-logo.svg" alt="Logo" height="90px" /></a>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Icon name="circle notch" size="huge" loading />
                <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>Validando seu cadastro...</h4>
              </div>
            </Message.Content>
          </Message>
        )}

        {!loading &&
          success && (
            <Message success style={styles.message}>
              <Message.Content>
                <a href="#home" onClick={this.handleScroll}><img href="#home" src="/react-logo.svg" alt="Lgoo" height="90px" /></a>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Icon name="checkmark" size="huge" />
                  <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>Tudo certo! Sua conta foi confirmada.</h4>
                </div>
                <Button as={Link} to="/login" color="blue">Acessar Conta</Button>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative style={styles.message}>
              <Message.Content>
                <a href="#home" onClick={this.handleScroll}><img href="#home" src="/react-logo.svg" alt="Logo" height="90px" /></a>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Icon name="warning sign" size="huge" />
                  <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>Ooops. {error}</h4>
                </div>
                <Button as={Link} to="/login" color="blue">Acessar Conta</Button>
              </Message.Content>
            </Message>
          )}
      </Container>
    );
  }
}

const styles = {
  message: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "auto",
    marginTop: "50px",
    padding: "30px"
  }
}

ConfirmacaoCadastro.propTypes = {
  confirmarCadastro: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirmarCadastro })(ConfirmacaoCadastro);
