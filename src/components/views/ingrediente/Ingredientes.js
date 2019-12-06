import React, { Component } from 'react'
import { Link } from "react-router-dom";
import MenuHorizontal from '../../layouts/MenuHorizontal';
import { Container, Button, Card } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { find, findByIdAndDelete } from "../../../actions/ingrediente";

class CadastrarIngrediente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientes: { ...props.ingredientes },
      loading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    await this.props.find();
    this.setState({ loading: false })
  }

  onDelete = async (id) => {
    await this.props.findByIdAndDelete(id);
  }

  render() {
    return (
      <div>
        <MenuHorizontal />
        <Container style={{ marginTop: "30px" }}>
          <h1>Lista de Ingredientes</h1>
          {(!this.state.loading && this.props.ingredientes.length > 0) ?
            this.props.ingredientes.map(ingrediente => {
              return (
                <Card key={ingrediente._id}>
                  <Card.Content>
                    <Card.Header>{ingrediente.produto}</Card.Header>
                    <Card.Meta>{ingrediente.createdAt}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' as={Link} to={`/ingrediente/editar/${ingrediente._id}`}>
                        Editar
                      </Button>
                      <Button
                        basic
                        color='red'
                        onClick={() => this.onDelete(ingrediente._id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              )
            })
            :
            false
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ingredientes: state.ingrediente.ingredientes
  }
}

const mapDispatchToProps = (dispatch) => {
  return (
    bindActionCreators({ find, findByIdAndDelete }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarIngrediente);