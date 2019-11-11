import axios from 'axios';
// const localhostIP = '192.168.0.35'
const localhostIP = 'localhost';

export const api = axios.create({
  baseURL: `http://${localhostIP}:8080`,
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

export const postLocation = location => {
  return api.post('/location', location);
};
