import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { scrollToPosition } from "../utils/links";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
//Geral
import Erro404 from './views/errors/404';
import ConfirmacaoCadastro from "./views/auth/ConfirmacaoCadastro";
import RecuperacaoSenha from "./views/auth/RecuperacaoSenha";
import Login from "./views/auth/Login";
import Cadastro from "./views/auth/Cadastro";
import Logout from "./views/auth/Logout";

//Usuario
import Dashboard from "./controllers/Dashboard";
import Perfil from "./controllers/usuario/Perfil";
import CadastrarIngrediente from "./views/ingrediente/CadastrarIngrediente";

const App = ({ location }) => {
  return (
    <div>
      {scrollToPosition(0)}
      <Switch>
        <UserRoute location={location} path="/" exact component={Dashboard} />
        <GuestRoute location={location} path="/cadastro" exact component={Cadastro} />
        <Route location={location} path="/confirmar-cadastro/:token" exact component={ConfirmacaoCadastro} />
        <GuestRoute location={location} path="/login" exact component={Login} />
        <GuestRoute location={location} path="/recuperar-senha/:token" exact component={RecuperacaoSenha} />
        <UserRoute location={location} path="/logout" exact component={Logout} />
        <UserRoute location={location} path="/perfil" exact component={Perfil} />

        <UserRoute location={location} path="/ingrediente/cadastrar" exact component={CadastrarIngrediente} />

        <Route location={location} component={Erro404} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
