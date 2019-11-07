import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT,
  LOADING_APP,
  START_GAME
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

export const startGame = role => ({
  type: START_GAME,
  role
});
