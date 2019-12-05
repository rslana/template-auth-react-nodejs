import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Transition, Message, Icon } from "semantic-ui-react";

class Sucesso extends Component {
  render() {
    const { text, tipo, children, style, icon } = this.props;
    return (
      <div>
        {(tipo === 'inline') ?
          <Transition animation="slide up" duration={{ show: 500, hide: 0 }} visible={!!text || !!children}><p className="msg-sucesso-inline" style={style}><Icon name="check" /> {text || children}</p></Transition>
          :
          (tipo === 'block') ?
            <Transition animation="fade up" duration={{ show: 1200, hide: 0 }} visible={!!text || !!children} transitionOnMount={true}>
              <Message positive style={styles.msgSucesso}>
                <div><Icon name={icon} size="big" /><br /><br />{text || children}</div>
              </Message>
            </Transition>
            : (false)
        }
      </div>
    )
  }
};

const styles = {
  msgSucesso: {
    textAlign: "center",
    padding: "32px 50px 26px 50px"
  }
}

Sucesso.defaultProps = {
  tipo: "inline",
  icon: "check circle outline"
};

Sucesso.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  tipo: PropTypes.oneOf(['inline', 'block']),
}

export default Sucesso;