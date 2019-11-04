import {
  TYPE_JOIN_FORM,
  TYPE_LOGIN_FORM,
  LOG_IN,
  LOG_OUT
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
  id
});

export const logOut = {
  type: LOG_OUT
};
