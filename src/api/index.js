import axios from 'axios';

const serverApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.find-me.website';

export const api = axios.create({
  baseURL: serverApi,
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
