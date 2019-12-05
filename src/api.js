import { create } from 'apisauce';

const getUrlFormated = url => {
  if (url.indexOf("http:") === 0 || url.indexOf("https:") === 0)
    return url
  return (window.location.protocol === "https:") ? `https://${url}` : `http://${url}`
}

const api = create({
  baseURL: getUrlFormated(process.env.REACT_APP_API_URL),
});

api.addAsyncRequestTransform(request => async () => {
  const token = await localStorage[process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN];
  if (token)
    request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (response.status === 401) {
    localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_AUTH_TOKEN);
    window.location.reload();
    localStorage.tokenExpired = 'Sua sessão expirou';
  }
  if (!response.ok) throw response;
});

export default {
  usuario: {
    cadastro: (data) =>
      api
        .post(`/auth/register`, { ...data })
        .then(res => res.data),
    login: (email, senha) =>
      api
        .post(`/auth/authenticate`, { email, senha, web: true })
        .then(res => res.data),
    getUsuario: () =>
      api
        .post(`/usuario/`)
        .then(res => res.data.usuario),
    enviarEmailRecuperacaoSenha: email =>
      api
        .post(`/auth/forgot_password`, { email })
        .then(res => res.data),
    confirmarCadastro: token =>
      api
        .post(`/auth/confirm_account`, { token })
        .then(res => res.data),
    confirmarTokenRecuperacaoSenha: token =>
      api
        .post(`/auth/confirm_token_reset_password`, { token })
        .then(res => res.data),
    recuperarSenha: data =>
      api
        .post(`/auth/reset_password`, { ...data })
        .then(res => res.data),
    alterarSenha: usuario =>
      api
        .put(`/usuario/alterarSenha`, { ...usuario })
        .then(res => res.data),
    alterarEmail: usuario =>
      api
        .put(`/usuario/alterarEmail`, { ...usuario })
        .then(res => res.data),
    alterarDadosPessoais: usuario =>
      api
        .put(`/usuario/alterarDadosPessoais`, { ...usuario })
        .then(res => res.data),
    confirmarTrocaEmail: token =>
      api
        .post(`/auth/confirm_token_update_email`, { token })
        .then(res => res.data),
    reverterTrocaEmail: token =>
      api
        .post(`/auth/confirm_token_revert_email`, { token })
        .then(res => res.data),
    reenviarEmailConfirmacaoCadastro: () =>
      api
        .put(`/usuario/reenviar_email_confirmacao_cadastro`)
        .then(res => res.data)
  },
};
