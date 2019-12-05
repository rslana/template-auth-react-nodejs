import decode from "jwt-decode";
import api from "../api";

export const usuarioCadastrado = user => ({
  type: 'USUARIO_CADASTRADO',
  user
});

export const userLoggedIn = user => ({
  type: 'USUARIO_LOGADO',
  user
});

export const userLoggedOut = () => ({
  type: 'USUARIO_DESLOGADO'
});

export const emailRecuperacaoSenhaEnviado = user => ({
  type: 'EMAIL_RECUPERACAO_SENHA_ENVIADO',
  user
});

export const cadastroUsuarioConfirmado = user => ({
  type: 'CADASTRO_USUARIO_CONFIRMADO',
  user
});

export const senhaRecuperada = user => ({
  type: 'SENHA_RECUPERADA',
  user
});

export const tokenRecuperacaoSenhaConfirmado = user => ({
  type: 'TOKEN_RECUPERACAO_SENHA_CONFIRMADO',
  user
});

export const tokenConfirmacaoTrocaEmailConfirmado = user => ({
  type: 'TOKEN_CONFIRMACAO_TROCA_EMAIL_CONFIRMADO',
  user
});

export const tokenReverterTrocaEmailConfirmado = user => ({
  type: 'TOKEN_REVERTER_TROCA_EMAIL_CONFIRMADO',
  user
});

const isPayloadExpired = (payloadExp) => {
  return new Date().getTime() * .001 > payloadExp
}

export const isAuthenticated = () => dispatch => {
  try {
    const payload = decode(localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN]);
    if (isPayloadExpired(payload.exp)) {
      window.location.reload();
      dispatch(logout("Sua sessão expirou"));
    }
    return !!payload.id;
  } catch (error) {
    return false
  }
}

export const login = (email, senha) => dispatch =>
  api.usuario.login(email, senha).then(data => {
    localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN] = data.token;
    dispatch(userLoggedIn(data));
  });

export const logout = (tokenExpired = "") => dispatch => {
  localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN);
  if (!!tokenExpired)
    localStorage.tokenExpired = tokenExpired;
  dispatch(userLoggedOut());
};

export const cadastro = (data) => dispatch =>
  api.usuario.cadastro(data).then(data => {
    dispatch(usuarioCadastrado(data.user));
  });

export const enviarEmailRecuperacaoSenha = email => dispatch =>
  api.usuario.enviarEmailRecuperacaoSenha(email).then(data => {
    dispatch(emailRecuperacaoSenhaEnviado(data.user));
  });

export const confirmarCadastro = token => dispatch =>
  api.usuario.confirmarCadastro(token).then(data => {
    dispatch(cadastroUsuarioConfirmado(data.user));
  });

export const recuperarSenha = data => dispatch =>
  api.usuario.recuperarSenha(data).then(data => {
    dispatch(senhaRecuperada(data.user));
  });

export const confirmarTokenRecuperacaoSenha = token => dispatch =>
  api.usuario.confirmarTokenRecuperacaoSenha(token).then(data => {
    return dispatch(tokenRecuperacaoSenhaConfirmado(data.user));
  });

export const confirmarTrocaEmail = token => dispatch =>
  api.usuario.confirmarTrocaEmail(token).then(data => {
    dispatch(tokenConfirmacaoTrocaEmailConfirmado(data.user));
  });

export const reverterTrocaEmail = token => dispatch =>
  api.usuario.reverterTrocaEmail(token).then(data => {
    dispatch(tokenReverterTrocaEmailConfirmado(data.user));
  });
