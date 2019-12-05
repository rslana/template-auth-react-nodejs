import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Icon, Responsive, Transition, Image } from 'semantic-ui-react';
import { scrollToIdOnClick } from "../../utils/links";
import { getPrimeiroNome } from "../../utils/formatador";

class MenuHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      visible: false,
      drawerWidth: "85%",
      loading: true
    };
  }

  handleScroll = e => {
    if (this.state.visible)
      this.setState({ visible: false })

    scrollToIdOnClick(e);
  }

  drawer = ({ tamanho }) =>
    this.setState({ visible: !this.state.visible, drawerWidth: tamanho ? tamanho : "85%" })

  render() {
    const { isAuthenticated, usuario } = this.props;
    const { visible } = this.state;
    if (isAuthenticated && usuario) {
      return (
        <div style={styles.normalize}>
          <div>
            <Menu fixed='top' className="navbar" secondary style={styles.menu}>
              <Menu.Item position="left">
                <Link to="/"><img src="/react-logo.svg" alt="Logo" height="30" /></Link>
              </Menu.Item>
              <Responsive as={Menu.Menu} minWidth={768} position='right' style={styles.menumenu}>
                <Menu.Item name="perfil">
                  <Link id="perfil" to="/perfil" className="menu-link menu-item">
                    {!usuario.fotoPerfil ? <Icon name="user circle outline" /> : <Image src={usuario.fotoPerfil} avatar />} {getPrimeiroNome(usuario.nome)}
                  </Link>
                </Menu.Item>
                <Menu.Item name="logout">
                  <Link id="logout" to="/logout" className="menu-link menu-item">
                    <Icon name="sign-out" />Sair
                  </Link>
                </Menu.Item>
              </Responsive>
              <Responsive as={Menu.Menu} maxWidth={767} position='right' style={styles.menumenu}>
                <Menu.Item className="menu-item">
                  <span className="menu-link" onClick={this.drawer}>
                    <Icon name={!visible ? "bars" : "close"} size="large" />
                  </span>
                </Menu.Item>
              </Responsive>
            </Menu>
            {/* Drawer */}
            <Transition duration={{ show: 400, hide: 250 }} animation="fade left" size='huge' visible={visible}>
              <div style={styles.drawer}>
                <div>
                  <Link id="perfil" to="/perfil" className="menu-link menu-link-drawer">
                    <Icon name="user circle outline" />{getPrimeiroNome(usuario.nome)}
                  </Link>
                </div>
                <div>
                  <Link id="logout" to="/logout" className="menu-link menu-link-drawer">
                    <Icon name="sign-out" />Sair
                  </Link>
                </div>
              </div>
            </Transition>
          </div>

          <Transition duration={{ show: 300, hide: 200 }} animation="fade" size='huge' visible={visible}>
            <div style={styles.bgDrawer} onClick={() => this.drawer({ tamanho: "300px" })}></div>
          </Transition>
        </div>
      )
    } else {
      return (
        <div style={styles.normalize}>
          <div>
            <Menu fixed='top' className="navbar" secondary style={styles.menu}>
              <Menu.Item position="left">
                <a href="#home" onClick={this.handleScroll}><img href="#home" src="/react-logo.svg" alt="Logo" height="30px" /></a>
              </Menu.Item>
              <Responsive as={Menu.Menu} minWidth={768} position='right' style={styles.menumenu}>
                <Menu.Item name="link1">
                  <a href="#link1" className="menu-link menu-item" onClick={this.handleScroll}>Link 1</a>
                </Menu.Item>
                <Menu.Item name="link2">
                  <a href="#link2" className="menu-link menu-item" onClick={this.handleScroll}>Link 2</a>
                </Menu.Item>
                <Menu.Item name="cadastro">
                  <Link id="cadastro" to="/cadastro" className="menu-link menu-item">
                    <Icon name="user circle outline" />Cadastrar
                  </Link>
                </Menu.Item>
                <Menu.Item name="login">
                  <Link id="login" to="/login" className="menu-link menu-item">
                    <Icon name="sign-in" />Entrar
                  </Link>
                </Menu.Item>
              </Responsive>
              <Responsive as={Menu.Menu} maxWidth={767} position='right' style={styles.menumenu}>
                <Menu.Item className="menu-item">
                  <span className="menu-link" onClick={this.drawer}>
                    <Icon name={!visible ? "bars" : "close"} size="large" />
                  </span>
                </Menu.Item>
              </Responsive>
            </Menu>
            {/* Drawer */}
            <Transition duration={{ show: 400, hide: 250 }} animation="fade left" size='huge' visible={visible}>
              <div style={styles.drawer}>
                <div>
                  <a href="#link1" className="menu-link menu-link-drawer">Link 1</a>
                </div>
                <div>
                  <a href="#link2" className="menu-link menu-link-drawer">Link 2</a>
                </div>
                <div>
                  <Link id="login" to="/login" className="menu-link menu-link-drawer">
                    <Icon name="user circle outline" />Cadastrar
                  </Link>
                </div>
                <div>
                  <Link id="login" to="/login" className="menu-link menu-link-drawer">
                    <Icon name="sign-in" />Entrar
                  </Link>
                </div>
              </div>
            </Transition>
          </div>

          <Transition duration={{ show: 300, hide: 200 }} animation="fade" size='huge' visible={visible}>
            <div style={styles.bgDrawer} onClick={() => this.drawer({ tamanho: "300px" })}></div>
          </Transition>
        </div>
      )
    }
  }
}

const styles = {
  menu: {
    boxShadow: "0px 1px 4px #AAA",
    backgroundColor: "rgba(255,255,255,1)",
    zIndex: "1000"
  },
  menumenu: {
    marginRight: "10px"
  },
  normalize: {
    paddingBottom: "65px"
  },
  drawer: {
    position: "fixed",
    width: "85%",
    right: "0px",
    top: "54px",
    zIndex: 1001,
    backgroundColor: "#FFF",
    height: "100%",
  },
  bgDrawer: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,.8)",
    width: "100%",
    right: "0px",
    top: "54px",
    zIndex: 1000,
    height: "100%"
  },
  activeItem: {
    color: "#0984ce"
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    usuario: { ...state.user.user },
  };
}

export default connect(mapStateToProps, null)(MenuHorizontal);