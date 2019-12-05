import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon, Popup, Button } from "semantic-ui-react";
import Erro from "../layouts/mensagens/Erro";
import Sucesso from "../layouts/mensagens/Sucesso";
import InputMask from 'react-text-mask';
import * as FormValidator from "../../utils/formValidator";

class FormCadastroCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        nome: "",
        email: "",
        genero: "",
        dataNascimento: "",
        celular: "",
        senha: "",
        senha2: "",
        tipo: "cliente"
      },
      loading: false,
      sucesso: {},
      errors: {}
    }
  }

  getGeneros = () => [
    { key: 'masculino', value: 'masculino', text: 'Masculino' },
    { key: 'feminino', value: 'feminino', text: 'Feminino' },
    { key: 'outro', value: 'outro', text: 'Outro' }
  ]

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: {},
      sucesso: {}
    });

  onChangeSelect = (e, { name, value }) =>
    this.setState({
      data: { ...this.state.data, [name]: value },
      errors: {}
    })

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .then(() =>
          this.setState({
            data: {
              nome: "",
              email: "",
              genero: "",
              dataNascimento: "",
              celular: "",
              senha: "",
              senha2: ""
            },
            loading: false,
            sucesso: { cadastro: "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar seu cadastro." }
          })
        )
        .catch(err => {
          this.setState({
            data: {
              ...this.state.data,
              senha: "",
              senha2: ""
            },
            loading: false,
            sucesso: {},
            errors: { cadastro: FormValidator.getErro(err) }
          })
        });
    }
  };

  validate = data => {
    const errors = {};
    if (!FormValidator.isNomeCompleto(data.nome)) errors.nome = "Digite seu nome completo";
    if (!FormValidator.isEmail(data.email)) errors.email = "E-mail inválido";
    if (!FormValidator.isSenha(data.senha)) errors.senha = "Sua senha deve conter no mínimo 8 caracteres e pelo menos 1 número e 1 letra";
    if (!FormValidator.isSenhaIgual(data.senha, data.senha2)) errors.senha2 = "As senhas devem ser iguais";
    if (data.celular)
      if (!FormValidator.isNumeroCelular(data.celular)) errors.celular = "Número de celular inválido";
    if (data.dataNascimento)
      if (!FormValidator.isDataNascimento(data.dataNascimento)) errors.dataNascimento = "Data de nascimento inválida"
    return errors;
  };

  render() {
    const { data, errors, sucesso, loading } = this.state;
    return (
      <div>
        {(!sucesso.cadastro) ?
          <Form onSubmit={this.onSubmit} loading={loading}>
            <Erro tipo="block">{errors.cadastro}</Erro>
            <Form.Group widths={"equal"}>
              <Form.Field error={!!errors.nome} required>
                <label htmlFor="nome">Nome Completo</label>
                <Input placeholder='nome'>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome e sobrenome"
                    value={data.nome}
                    onChange={this.onChange}
                  />
                </Input>
                <Erro text={errors.nome} />
              </Form.Field>
              <Form.Field error={!!errors.email} required>
                <label htmlFor="email">E-mail</label>
                <Input placeholder='Email'>
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
            </Form.Group>

            {/* {(this.props.tipoUsuario === "3") ? */}
            <Form.Group widths={"equal"}>
              <Form.Field error={!!errors.genero}>
                <Form.Select
                  fluid
                  label='Gênero'
                  name="genero"
                  options={this.getGeneros()}
                  onChange={this.onChangeSelect}
                  value={data.genero}
                  placeholder='Gênero'
                />
                <Erro text={errors.genero} />
              </Form.Field>
              <Form.Field error={!!errors.celular}>
                <label htmlFor="celular">Celular</label>
                <InputMask
                  type="text"
                  id="celular"
                  name="celular"
                  placeholder="(ddd) número"
                  mask={['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  guide={true}
                  value={data.celular}
                  onChange={this.onChange}
                />
                <Erro text={errors.celular} />
              </Form.Field>
              <Form.Field error={!!errors.dataNascimento}>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <InputMask
                  type="text"
                  id="dataNascimento"
                  name="dataNascimento"
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  guide={true}
                  placeholder="dia/mês/ano"
                  value={data.dataNascimento}
                  onChange={this.onChange}
                />
                <Erro text={errors.dataNascimento} />
              </Form.Field>
            </Form.Group>

            <Form.Group widths={"equal"}>
              <Form.Field error={!!errors.senha || !!errors.senha2} required>
                <label htmlFor="senha">Senha</label>
                <Popup
                  trigger={
                    <Input placeholder='Senha'>
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
              <Form.Field error={!!errors.senha || !!errors.senha2} required>
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
            </Form.Group>

            <div className="row align-items-center">
              <div className="col-12 text-sm-right text-center" style={styles.btn}>
                <Button as={Button} className="btn-login-entrar" icon labelPosition='right' color="blue" type="submit" fluid onClick={this.onSubmit}>
                  Cadastrar <Icon name='right chevron' />
                </Button>
              </div>
            </div>
          </Form>
          :
          <Sucesso tipo="block">{sucesso.cadastro}</Sucesso>
        }
      </div>
    );
  }
}

const styles = {
  btn: {
    marginTop: "20px",
    marginBottom: "10px"
  }
}

FormCadastroCliente.propTypes = {
  submit: PropTypes.func.isRequired
};

export default FormCadastroCliente;
