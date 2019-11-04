import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

export const postJoin = joinData => {
  return api.post('/join', joinData);
};

export const postLogin = loginData => {
  return api.post('/login', loginData);
};

export const postToken = () => {
  return api.get('/checkToken');
};
