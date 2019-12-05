import { USUARIO_CADASTRADO, USUARIO_LOGADO, USUARIO_DESLOGADO, CADASTRO_USUARIO_CONFIRMADO } from "./types";

const initState = {
  user: {
    nome: "",
    email: "",
    genero: "",
    dataNascimento: "",
    celular: "",
    senha: "",
    tipo: "",
    ativo: false
  },
  errors: {}
}

export default function user(state = initState, action = {}) {
  switch (action.type) {
    case USUARIO_CADASTRADO:
      return action.user;
    case USUARIO_LOGADO:
      return action.user;
    case CADASTRO_USUARIO_CONFIRMADO:
      return { ...state, user: { ...state.user, ativo: true } }
    case USUARIO_DESLOGADO:
      return {};
    default:
      return state;
  }
}
