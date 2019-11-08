import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT,
  LOADING_APP,
  START_GAME,
  TAKE_PHOTO,
  SEND_PHOTO,
  RECEIVE_PHOTO
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
  game: {
    isStarted: false,
    role: '',
    socket: null
  },
  hide: {
    ready: false,
    photo: [],
    response: false
  },
  seek: {
    ready: false,
    photo: [],
    response: false
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
          role: action.role,
          socket: action.socket
        }
      });
    case TAKE_PHOTO:
      const photo = state.hide.photo.slice();
      photo.push(action.photo);
      return Object.assign({}, state, {
        hide: {
          photo: photo
        }
      });
    case SEND_PHOTO:
      return Object.assign({}, state, {
        hide: {
          ready: true
        }
      });
    case RECEIVE_PHOTO:
      return Object.assign({}, state, {
        seek: {
          ready: true,
          photo: action.photo,
        }
      })

    default:
      return state;
  }
}

export default reducer;
