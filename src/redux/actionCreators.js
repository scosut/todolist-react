import * as actionTypes from './actionTypes';
import ReactDOM from 'react-dom';

// todos
export const fetchTodos = () => dispatch => {
  return fetch('http://www.local-todolist-api.com/api/todo')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addTodos(response.data)))
    .catch(error => dispatch(todosFailed(error.message)));
};

export const fetchTodo = (todoId, inputFlag = false) => (dispatch) => {
  return fetch(`http://www.local-todolist-api.com/api/todo/${todoId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => {
      dispatch(addTodo(response.data));
      if (inputFlag) {
        dispatch(setInputFromObject(response.data));
      }
    })
    .catch(error => dispatch(todoFailed(error.message)));
};

export const postTodo = (text, body, due, refs) => dispatch => {
  const newTodo = {
    text: text,
    body: body,
    due: due
  };

  return fetch('http://www.local-todolist-api.com/api/todo', {
    method: 'POST',
    body: JSON.stringify(newTodo)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput());
        dispatch(addAlert(response.message, 'success'));
        dispatch(setRedirect('/'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('add todo: ', error.message);
    });
};

export const putTodo = (todoId, text, body, due, refs) => dispatch => {
  const oldTodo = {
    text: text,
    body: body,
    due: due
  };

  return fetch(`http://www.local-todolist-api.com/api/todo/${todoId}?_method=PUT`, {
    method: 'POST',
    body: JSON.stringify(oldTodo)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput());
        dispatch(addAlert(response.message, 'success'));
        dispatch(setRedirect('/'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('edit todo: ', error.message);
    });
};

export const deleteTodo = (todoId) => dispatch => {
  return fetch(`http://www.local-todolist-api.com/api/todo/${todoId}?_method=DELETE`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(addAlert(response.message, 'success'));
        dispatch(setRedirect('/'));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('delete todo: ', error.message);
    });
};

export const todosFailed = errMess => ({
  type: actionTypes.TODOS_FAILED,
  payload: errMess
});

export const addTodos = todos => ({
  type: actionTypes.ADD_TODOS,
  payload: todos
});

export const todoFailed = errMess => ({
  type: actionTypes.TODO_FAILED,
  payload: errMess
});

export const addTodo = todo => ({
  type: actionTypes.ADD_TODO,
  payload: todo
});

//ALERT
export const addAlert = (alert, status) => ({
  type: actionTypes.ADD_ALERT,
  payload: { message: alert, status: status }
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT
});

// TOGGLERS
export const toggleNavigation = () => {
  return {
    type: actionTypes.TOGGLE_NAVIGATION
  };
};

// INPUT
export const setInput = e => ({
  type: actionTypes.SET_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const setInputFromObject = obj => ({
  type: actionTypes.SET_INPUT_FROM_OBJECT,
  payload: obj
});

export const clearInput = () => ({
  type: actionTypes.CLEAR_INPUT
});

// FORMS
export const addErrors = errors => ({
  type: actionTypes.ADD_ERRORS,
  payload: errors
});

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});

export const setFocus = (errs, refs) => {
  const keys = Object.keys(errs);
  const el = keys.length > 0 ? refs[keys[0]] : null;

  if (el) {
    ReactDOM.findDOMNode(el).scrollIntoView();
    ReactDOM.findDOMNode(el).focus();
  }
};

// REDIRECT
export const setRedirect = url => ({
  type: actionTypes.SET_REDIRECT,
  payload: url
});

export const clearRedirect = () => ({
  type: actionTypes.CLEAR_REDIRECT
});