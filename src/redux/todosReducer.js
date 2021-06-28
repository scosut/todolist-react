import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  todos: []
};

export const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODOS:
      return { ...state, errMess: '', todos: action.payload };

    case actionTypes.TODOS_FAILED:
      return { ...state, errMess: action.payload, todos: [] };

    default:
      return state;
  }
};