import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Message, Input, Icon, Transition, Loader, Dimmer, Popup, Button } from "semantic-ui-react";
import Validator from "validator";
import * as FormValidator from "../../utils/formValidator";
import * as Formatador from "../../utils/formatador";
import Erro from "../layouts/mensagens/Erro";
import Sucesso from "../layouts/mensagens/Sucesso";

class FormRecuperacaoSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        senha: "",
        senha2: "",
        token: this.props.token
      },
      usuario: {
        nome: ""
      },
      loading: false,
      sucesso: false,
      errors: {}
    }
  }

  componentDidMount = () => {
    if (this.props.token) {
      this.setState({ loading: true })
      this.props
        .confirmarToken(this.props.token)
        .then(data => {
          this.setState({
            loading: false,
            success: true,
            data: { ...this.state.data, email: data.user.email },
            usuario: { nome: data.user.nome }
          })
        })
        .catch((err) => this.setState({
          loading: false,
          success: false,
          errors: { recuperacao: err.data.error }
        }));
    }
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: {}
    });

  onSubmit = async (e) => {
    e.preventDefault();
    const errors = (this.props.token) ? this.validateRedifinirSenha(this.state.data) : this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      try {
        await this.props.submit(this.state.data);
        this.setState({ sucesso: true, loading: false, data: { email: "", senha: "", senha2: "", token: this.props.token } });
      } catch (err) {
        this.setState({ errors: { recuperacao: err.data.error }, loading: false, data: { email: "", senha: "", senha2: "", token: this.props.token } })
      }
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "E-mail inválido";
    return errors;
  };

  validateRedifinirSenha = data => {
    const errors = {};
    if (!FormValidator.isSenha(data.senha)) errors.senha = "Senha inválida";
    if (!FormValidator.isSenhaIgual(data.senha, data.senha2)) errors.senha2 = "As senhas devem ser iguais";
    return errors;
  }

  render() {
    const { data, usuario, errors, loading, sucesso } = this.state;
    const { token } = this.props;
    return (
      <div>
        <Transition duration={{ show: 800, hide: 0 }} animation="fly left" visible={!!errors.recuperacao}>
          <Message negative>
            <p>{errors.recuperacao}</p>
          </Message>
        </Transition>

        {loading && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}

        <Transition duration={{ show: 800, hide: 0 }} animation="fly left" visible={sucesso && !token}>
          <Sucesso icon="mail" tipo='block'>
            Enviamos um link para redefinir sua senha. Caso não encontre esse email na caixa de entrada, verifique a caixa de SPAMs.
          </Sucesso>
        </Transition>
        <Transition duration={{ show: 800, hide: 0 }} animation="fly left" visible={sucesso && !!token}>
          <Sucesso icon="key" tipo="block">
            <p>Senha redefinida com sucesso!</p>
          </Sucesso>
        </Transition>

        {(!loading && !errors.recuperacao) ?
          <div>
            <Transition duration={{ show: 800, hide: 0 }} animation="fly left" visible={!sucesso && !token}>
              <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.email}>
                  <label htmlFor="email">E-mail</label>
                  <Input iconPosition='left' placeholder='Email'>
                    <Icon name='mail' />
                    <input
                      type="email"
                      id="email_recuperacao"
                      name="email"
                      placeholder="exemplo@exemplo.com"
                      value={data.email}
                      onChange={this.onChange}
                    />
                  </Input>
                  <Erro text={errors.email} />
                </Form.Field>

                <div className="row align-items-center">
                  <div className="col-12 text-center order-sm-12" style={styles.btn}>
                    <Button size="medium" icon labelPosition='right' color="blue" type="submit" fluid className="btn-login-entrar" onClick={this.onSubmit}>
                      Recuperar Senha <Icon name='right chevron' />
                    </Button>
                  </div>
                </div>
              </Form>
            </Transition>

            <Transition duration={{ show: 800, hide: 0 }} animation="fly left" visible={!sucesso && !!token}>
              <Form onSubmit={this.onSubmit} loading={loading}>
                <p style={{ textAlign: "center" }}>Olá, {Formatador.getPrimeiroNome(usuario.nome)}</p>
                <p style={{ textAlign: "center" }}>Agora você pode alterar sua senha</p>
                <br />
                <Form.Field error={!!errors.senha || !!errors.senha2}>
                  <label htmlFor="senha">Nova Senha</label>
                  <Popup
                    trigger={
                      <Input placeholder='Nova Senha'>
                        <input
                          type="password"
                          id="senha"
                          name="senha"
                          value={data.senha}
                          onChange={this.onChange}
                        />
                      </Input>
                    }
                    content='Sua senha deve conter no mínimo 8 caracteres e pelo menos 1 número e 1 letra.'
                    size="small"
                  />
                  <Erro text={errors.senha} />
                </Form.Field>

                <Form.Field error={!!errors.senha || !!errors.senha2}>
                  <label htmlFor="senha">Confirmar senha</label>
                  <Input placeholder='Confirmar senha'>
                    <input
                      type="password"
                      id="senha2"
                      name="senha2"
                      value={data.senha2}
                      onChange={this.onChange}
                    />
                  </Input>
                  <Erro text={errors.senha2} />
                </Form.Field>

                <div className="row align-items-center">
                  <div className="col-12 text-center order-sm-12" style={styles.btn}>
                    <Button size="medium" icon labelPosition='right' color="blue" type="submit" fluid className="btn-login-entrar" onClick={this.onSubmit}>
                      Redefinir Senha <Icon name='right chevron' />
                    </Button>
                  </div>
                </div>
              </Form>
            </Transition>
          </div>
          : (false)}
      </div>
    );
  }
}

const styles = {
  btn: {
    margin: "10px 0"
  },
  normalize: {
    marginBottom: "0px"
  }
}

FormRecuperacaoSenha.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string,
  confirmarTokenRecuperacaoSenha: PropTypes.func
};

export default FormRecuperacaoSenha;
