const initState = {
  ingrediente: {
    produto: "",
  },
  ingredientes: [],
  quantidade: 0,
  errors: {}
}

const ingrediente = (state = initState, action = {}) => {
  switch (action.type) {
    case 'FIND_INGREDIENTES_SUCCESS':
      return {
        ...initState,
        ingredientes: action.dados.ingredientes,
        quantidade: action.dados.quantidade,
      };
    case 'CREATE_INGREDIENTE_SUCCESS':
      return {
        ...initState,
        ingredientes: [action.ingrediente, ...state.ingredientes],
        quantidade: state.quantidade + 1
      };
    case 'FIND_BY_ID_INGREDIENTE_SUCCESS':
      return {
        ...initState,
        ingrediente: { ...state.ingrediente, ...action.ingrediente }
      };
    case 'QUANTIDADE_INGREDIENTES_SUCCESS':
      return {
        ...state,
        quantidade: action.dados.quantidade
      };
    case 'UPDATE_INGREDIENTE_SUCCESS':
      return {
        ...initState,
        ingrediente: action.ingrediente,
        quantidade: state.quantidade,
        ingredientes: state.ingredientes.map(ingrediente => {
          if (ingrediente._id === action.ingrediente._id)
            return action.ingrediente;
          return ingrediente;
        })
      };
    case 'ADD_INGREDIENTE_ERROR':
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
}

export default ingrediente;