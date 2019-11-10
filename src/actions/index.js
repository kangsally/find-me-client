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
  RECEIVE_MESSAGE
} from '../constants/actionTypes';

export const typeJoinForm = ({ name, value }) => ({
  type: TYPE_JOIN_FORM,
  name,
  value
});

export const typeLoginForm = ({ name, value }) => ({
  type: TYPE_LOGIN_FORM,
  name,
  value
});

export const logIn = (id, point) => ({
  type: LOG_IN,
  id,
  point
});

export const logOut = {
  type: LOG_OUT
};

export const loadingApp = {
  type: LOADING_APP
};

export const startGame = (role, socket) => ({
  type: START_GAME,
  role,
  socket
});

export const takePhoto = photo => ({
  type: TAKE_PHOTO,
  photo
});

export const sendPhotoLocation = location => ({
  type: SEND_PHOTO_LOCATION,
  location
});

export const receivePhotoLocation = (photo, location) => ({
  type: RECEIVE_PHOTO_LOCATION,
  photo,
  location
});

export const sendSeekLocation = location => ({
  type: SEND_SEEK_LOCATION,
  location
});

export const receiveSeekLocation = location => ({
  type: RECEIVE_SEEK_LOCATION,
  location
});

export const receiveEndTime = time => ({
  type: RECEIVE_END_TIME,
  time
})

export const typeMessage = message => ({
  type: TYPE_MESSAGE,
  message
})

export const sendMessage = {
  type: SEND_MESSAGE
}

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
})
