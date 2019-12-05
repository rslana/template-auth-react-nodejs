import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Transition, Message } from "semantic-ui-react";

class Erro extends Component {
  render() {
    const { text, tipo, children } = this.props;
    return (
      <div>
        {(tipo === 'inline') ?
          <Transition animation="slide up" duration={{ show: 500, hide: 0 }} visible={!!text || !!children}><p style={styles.erro}>{text || children}</p></Transition>
          :
          (tipo === 'block') ?
            <Transition animation="slide up" duration={{ show: 500, hide: 0 }} visible={!!text || !!children}>
              <Message negative style={styles.block}>
                <div>{text || children}</div>
              </Message>
            </Transition>
            : (false)
        }
      </div>
    )
  }
};

const styles = {
  block: {
    marginBottom: "20px",
    paddingTop: "14px",
    paddingBottom: "10px"
  },
  erro: {
    fontSize: ".9em",
    padding: "5px 0",
    color: "#ce1916",
    fontWeight: 500
  }
}

Erro.defaultProps = {
  tipo: 'inline'
};

Erro.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  tipo: PropTypes.oneOf(['inline', 'block']),
}

export default Erro;