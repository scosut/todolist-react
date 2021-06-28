import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  todo: {
    id: '',
    text: '',
    body: '',
    due: ''
  }
};

export const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return { ...state, errMess: '', todo: action.payload };

    case actionTypes.TODO_FAILED:
      return { ...state, errMess: action.payload, todo: { id: '', text: '', body: '', due: '' } };

    default:
      return state;
  }
};