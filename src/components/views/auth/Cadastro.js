import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuHorizontal from "../../layouts/MenuHorizontal";
import FormCadastro from "../../forms/FormCadastro";
import { cadastro } from "../../../actions/auth";
import { Card, Transition, Container } from "semantic-ui-react";

const Cadastro = (props) => {

  const submit = data =>
    props.cadastro(data).then((data) => data);

  return (
    <div>
      <MenuHorizontal activeItem={"Cadastro"} />
      <div className="pagina-login">
        <Container>
          <Transition animation="horizontal flip" duration={{ show: 800, hide: 0 }} visible={true} transitionOnMount={true}>
            <Card fluid className="card-auth" style={styles.card} color="blue">
              <Card.Content>
                <Card.Header className="text-center card-header" style={styles.header}>
                  <div style={styles.divTitulo}>
                    <img src="/react-logo.svg" width="48" alt="Logo" />
                    <p style={styles.titulo}>Template</p>
                  </div>
                  <div>
                    <span>Cadastro</span>
                  </div>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <FormCadastro submit={submit} />
              </Card.Content>
            </Card>
          </Transition>
        </Container>
      </div>
    </div>
  );
}

Cadastro.propTypes = {
  cadastro: PropTypes.func.isRequired
}

const styles = {
  card: {
    padding: "5px 15px 0px 15px",
    margin: "auto",
    marginTop: "80px",
    marginBottom: "40px",
    overflow: "hidden",
    maxWidth: "600px"
  },
  header: {
    padding: "10px 10px",
    textAlign: "center"
  },
  cardLink: {
    fontSize: "13px",
    color: "#2185e0",
    cursor: "pointer",
    textAlign: "center"
  },
  titulo: {
    fontSize: "20px",
    fontWeight: 100,
    padding: "10px"
  },
}

export default connect(null, { cadastro })(Cadastro);
