import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon, Button } from "semantic-ui-react";
import * as FormValidator from "../../utils/formValidator";
import Erro from "../layouts/mensagens/Erro";

class FormLogin extends Component {
  state = {
    data: {
      email: "",
      senha: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: {}
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({
            errors: {
              login: FormValidator.getErro(err)
            },
            data: {
              ...this.state.data,
              senha: ""
            },
            loading: false
          })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!FormValidator.isEmail(data.email)) errors.email = "E-mail inválido";
    if (!data.senha) errors.senha = "Senha inválida";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Erro tipo="block">{errors.login}</Erro>

        <Form.Field error={!!errors.email}>
          <label htmlFor="email">E-mail</label>
          <Input iconPosition='left' placeholder='Email'>
            <Icon name='mail' />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@exemplo.com"
              value={data.email}
              onChange={this.onChange}
            />
          </Input>
          <Erro text={errors.email} />
        </Form.Field>

        <Form.Field error={!!errors.senha}>
          <label htmlFor="senha">Senha</label>
          <Input iconPosition='left' placeholder='senha'>
            <Icon name='key' />
            <input
              type="password"
              id="senha"
              name="senha"
              value={data.senha}
              onChange={this.onChange}
            />
          </Input>
          <Erro text={errors.senha} />
        </Form.Field>

        <div className="row align-items-center">
          <div className="col-12 text-center order-sm-12" style={styles.btn}>
            <Button size="medium" icon labelPosition='right' color="blue" type="submit" fluid className="btn-login-entrar" onClick={this.onSubmit}>
              Entrar <Icon name='right chevron' />
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

const styles = {
  btn: {
    margin: "10px 0px"
  }
}

FormLogin.propTypes = {
  submit: PropTypes.func.isRequired
};

export default FormLogin;
