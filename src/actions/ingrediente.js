import api from "../api";
import errorHandler from "../utils/errorHandler";

const createSuccess = ingrediente => ({
  type: 'CREATE_INGREDIENTE_SUCCESS',
  ingrediente
});

const findSuccess = (dados) => ({
  type: 'FIND_INGREDIENTES_SUCCESS',
  dados,
})

const findByIdSuccess = ingrediente => ({
  type: 'FIND_BY_ID_INGREDIENTE_SUCCESS',
  ingrediente
})

const findByIdAndUpdateSuccess = ingrediente => ({
  type: 'UPDATE_INGREDIENTE_SUCCESS',
  ingrediente
})

const addError = errors => ({
  type: 'ADD_INGREDIENTE_ERROR',
  errors
})

export const create = (dados) => async dispatch => {
  return api.ingrediente.create(dados).then(data => {
    return dispatch(createSuccess(data));
  }).catch(error => {
    dispatch(addError(errorHandler.getError(error)));
  })
}

export const findById = id => async dispatch => {
  return api.ingrediente.findById(id).then(data => {
    return dispatch(findByIdSuccess(data));
  }).catch(error => {
    dispatch(addError(errorHandler.getError(error)));
  })
}

export const find = () => async dispatch => {
  return api.ingrediente.find().then(data => {
    return dispatch(findSuccess(data));
  }).catch(error => {
    dispatch(addError(errorHandler.getError(error)));
  })
}

export const findByIdAndUpdate = (id, data) => async dispatch => {
  return api.ingrediente.findByIdAndUpdate(id, data).then(data => {
    return dispatch(findByIdAndUpdateSuccess(data));
  }).catch(error => {
    dispatch(addError(errorHandler.getError(error)));
  })
}

export const findEnderecoByCep = cep => async dispatch => {
  return api.global.findEnderecoByCep(cep).then(res => {
    if (res.ok && !res.data.erro) {
      return res.data;
    } else {
      dispatch(addError({ cep: "CEP não encontrado" }));
    }
  }).catch(error => {
    dispatch(addError(errorHandler.getError(error)));
  })
}