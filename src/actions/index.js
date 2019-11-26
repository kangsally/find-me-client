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
  STOP_FIRST_HINT_BUTTON,
  SHOW_DISTANCE,
  SHOW_PHOTO,
  HIDE_PHOTO,
  SHOW_MAP,
  HIDE_MAP,
  FINISH_GAME,
  BACK_TO_HOME
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

export const logIn = id => ({
  type: LOG_IN,
  id,
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

export const receivePhotoLocation = (photo, location, hint, geoLocationId) => ({
  type: RECEIVE_PHOTO_LOCATION,
  photo,
  location,
  hint,
  geoLocationId
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
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const activateFirstHintButton = {
  type: ACTIVATE_FIRST_HINT_BUTTON,
};

export const activateSecondHintButton = {
  type: ACTIVATE_SECOND_HINT_BUTTON
};

export const stopFirstHintButton = {
  type: STOP_FIRST_HINT_BUTTON
}

export const showDistance = distance => ({
  type: SHOW_DISTANCE,
  distance
})

export const showPhoto = {
  type: SHOW_PHOTO
};

export const hidePhoto = {
  type: HIDE_PHOTO
};

export const showMap = {
  type: SHOW_MAP
};

export const hideMap = {
  type: HIDE_MAP
};

export const finishGame = (result, finishMessage) => ({
  type: FINISH_GAME,
  result,
  finishMessage
});

export const backToHome = {
  type: BACK_TO_HOME
};
