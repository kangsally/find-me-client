import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT,
  LOADING_APP,
  START_GAME,
  TAKE_PHOTO,
  SEND_PHOTO_LOCATION,
  RECEIVE_PHOTO_LOCATION,
  SEND_SEEK_LOCATION,
  RECEIVE_SEEK_LOCATION,
  RECEIVE_END_TIME,
  TYPE_MESSAGE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  ACTIVATE_FIRST_HINT_BUTTON,
  ACTIVATE_SECOND_HINT_BUTTON,
  SHOW_PHOTO,
  HIDE_PHOTO,
  SHOW_MAP,
  HIDE_MAP
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
    socket: null,
    endTime: null
  },
  hide: {
    ready: false,
    photo: [],
    notice: false,
    partnerLocation: null,
    myLocation: null,
    message: '',
    messageCount: 0
  },
  seek: {
    ready: false,
    photo: [],
    notice: false,
    partnerLocation: null,
    myLocation: null,
    hintLocation: null,
    message: '',
    firstHint: false,
    secondHint: false,
    isShownPhoto: false,
    isShownMap: false
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
        },
        login: {
          id: '',
          password: ''
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
          socket: action.socket,
          endTime: null
        }
      });

    case TAKE_PHOTO:
      const photo = state.hide.photo.slice();
      photo.push(action.photo);
      return Object.assign({}, state, {
        hide: Object.assign({}, state.hide, {
          photo: photo
        })
      });

    case SEND_PHOTO_LOCATION:
      return Object.assign({}, state, {
        hide: Object.assign({}, state.hide, {
          ready: true,
          myLocation: action.location
        })
      });

    case RECEIVE_PHOTO_LOCATION:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          ready: true,
          photo: action.photo,
          partnerLocation: action.location,
          hintLocation: action.hint
        })
      });

    case SEND_SEEK_LOCATION:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          myLocation: action.location
        })
      });

    case RECEIVE_SEEK_LOCATION:
      return Object.assign({}, state, {
        hide: Object.assign({}, state.hide, {
          partnerLocation: action.location
        })
      });

    case RECEIVE_END_TIME:
      return Object.assign({}, state, {
        game: Object.assign({}, state.game, {
          endTime: action.time
        })
      });

    case TYPE_MESSAGE:
      return Object.assign({}, state, {
        hide: Object.assign({}, state.hide, {
          message: action.message
        })
      });

    case SEND_MESSAGE:
      return Object.assign({}, state, {
        hide: Object.assign({}, state.hide, {
          message: '',
          messageCount: (state.hide.messageCount += 1)
        })
      });

    case RECEIVE_MESSAGE:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          message: action.message
        })
      });

    case ACTIVATE_FIRST_HINT_BUTTON:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          firstHint: true
        })
      });

    case ACTIVATE_SECOND_HINT_BUTTON:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          secondHint: true
        })
      });

    case SHOW_PHOTO:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          isShownPhoto: true
        })
      });

    case HIDE_PHOTO:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          isShownPhoto: false
        })
      });

    case SHOW_MAP:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          isShownMap: true
        })
      });

    case HIDE_MAP:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          isShownMap: false
        })
      });

    default:
      return state;
  }
}

export default reducer;
