import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT
} from '../constants/actionTypes';

const initialState = {
  join: {
    id: '',
    password: '',
    passwordToCheck: ''
  },
  login: {
    id: '',
    password: ''
  },
  isLoggedIn: {
    check: false,
    id: ''
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE_JOIN_FORM:
      return Object.assign({}, state, {
        join: Object.assign({}, state.join, {
          [action.name]: action.value
        })
      });
    case TYPE_LOGIN_FORM:
      return Object.assign({}, state, {
        login: Object.assign({}, state.login, {
          [action.name]: action.value
        })
      });
    case LOG_IN:
      return Object.assign({}, state, {
        login: Object.assign({}, state.isLoggedIn, {
          check: true,
          id: action.id
        })
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        login: Object.assign({}, state.isLoggedIn, {
          check: false,
          id: ''
        })
      });
    default:
      return state;
  }
}

export default reducer;
