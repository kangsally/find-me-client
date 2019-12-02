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
  RECEIVE_MESSAGE,
  ACTIVATE_FIRST_HINT_BUTTON,
  ACTIVATE_SECOND_HINT_BUTTON,
  SHOW_DISTANCE,
  SHOW_PHOTO,
  HIDE_PHOTO,
  SHOW_MAP,
  HIDE_MAP,
  FINISH_GAME,
  BACK_TO_HOME
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
    id: ''
  },
  game: {
    isStarted: false,
    role: '',
    socket: null,
    endTime: null,
    result: null,
    finishMessage: null
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
    geoLocationId: null,
    message: '',
    firstHint: false,
    secondHint: false,
    isShownPhoto: false,
    isShownMap: false,
    distanceHint: null
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
          id: action.id
        },
        login: {
          id: '',
          password: ''
        }
      });

    case LOG_OUT:
      return Object.assign({}, initialState);

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
          endTime: null,
          endMessage: null
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
          hintLocation: action.hint,
          geoLocationId: action.geoLocationId
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

    case SHOW_DISTANCE:
      return Object.assign({}, state, {
        seek: Object.assign({}, state.seek, {
          distanceHint: action.distance,
          firstHint: false
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

    case FINISH_GAME:
      return Object.assign({}, state, {
        game: Object.assign({}, state.game, {
          result: action.result,
          finishMessage: action.finishMessage
        })
      });

    case BACK_TO_HOME:
      if(state.seek.geoLocationId){
        navigator.geolocation.clearWatch(state.seek.geoLocationId);
      }
      return Object.assign({}, state, {
        game: Object.assign({}, initialState.game),
        hide: Object.assign({}, initialState.hide),
        seek: Object.assign({}, initialState.seek)
      });

    default:
      return state;
  }
}

export default reducer;
