import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT,
  LOADING_APP,
  START_GAME
} from '../constants/actionTypes';

const initialState = {
  initialLoading: false,
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
    check: false
  },
  user: {
    id: '',
    point: 0
  },
  game:{
    isStarted: false,
    role: ''
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
        isLoggedIn: {
          check: true
        },
        user: {
          id: action.id,
          point: action.point
        },
        login: {
          id: '',
          password: ''
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        isLoggedIn: {
          check: false
        },
        user: {
          id: '',
          point: 0
        }
      });
    case LOADING_APP:
      return Object.assign({}, state, {
        initialLoading: true
      });
    case START_GAME:
      return Object.assign({}, state, {
        game: {
          isStarted: true,
          role: action.role
        }
      })

    default:
      return state;
  }
}

export default reducer;
