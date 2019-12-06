import React, { Component } from 'react'
import MenuHorizontal from '../../layouts/MenuHorizontal';
import { Form, Button, Container } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { create } from "../../../actions/ingrediente";
import * as FormValidator from "../../../utils/formValidator";

class CadastrarIngrediente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingrediente: { ...props.ingrediente },
      loading: false
    }
  }

  onChange = e => {
    this.setState({
      ingrediente: {
        ...this.state.ingrediente,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    await this.props.create(this.state.ingrediente)
    this.setState({
      loading: false,
      sucesso: FormValidator.objIsEmpty(this.props.errors),
      errors: this.props.errors
    })
  }

  render() {
    const { ingrediente } = this.state;
    return (
      <div>
        <MenuHorizontal />
        <Container style={{ marginTop: "30px" }}>
          <h1>Cadastrar Ingrediente</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Produto</label>
              <input
                placeholder='produto'
                name="produto"
                onChange={this.onChange}
                value={ingrediente.produto}
              />
            </Form.Field>
            <Button type='submit'>Cadastrar</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingrediente: state.ingrediente.ingrediente
  }
}

const mapDispatchToProps = (dispatch) => {
  return (
    bindActionCreators({ create }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarIngrediente);