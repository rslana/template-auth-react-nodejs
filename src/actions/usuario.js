import api from "../api";

export const dadosPessoaisAlterado = usuario => ({
  type: 'DADOS_PESSOAIS_ALTERADO',
  usuario
});

export const emailAlterado = usuario => ({
  type: 'EMAIL_ALTERADO',
  usuario
});

export const senhaAlterada = usuario => ({
  type: 'SENHA_ALTERADA',
  usuario
});

export const emailConfirmacaoCadastroSucesso = usuario => ({
  type: 'EMAIL_CONFIRMACAO_CADASTRO_SUCESSO',
  usuario
});

export const getUsuario = () => async dispatch =>
  api.usuario.getUsuario().then(usuario => {
    return usuario;
  });

export const alterarDadosPessoais = usuario => dispatch =>
  api.usuario.alterarDadosPessoais(usuario).then(usuario => {
    dispatch(dadosPessoaisAlterado(usuario));
    return usuario;
  });

export const alterarEmail = usuario => dispatch =>
  api.usuario.alterarEmail(usuario).then(usuario => {
    dispatch(emailAlterado(usuario));
    return usuario;
  });

export const alterarSenha = usuario => dispatch =>
  api.usuario.alterarSenha(usuario).then(usuario => {
    dispatch(senhaAlterada(usuario));
    return usuario;
  });

export const reenviarEmailConfirmacaoCadastro = usuario => dispatch =>
  api.usuario.reenviarEmailConfirmacaoCadastro(usuario).then(usuario => {
    dispatch(emailConfirmacaoCadastroSucesso(usuario));
    return usuario;
  }); 
