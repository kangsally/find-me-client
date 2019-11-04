import React from 'react';
import './LoginForm.scss';

const LoginForm = ({ onSubmit, onChange, login, idError, pwError }) => {
  return (
    <div>
      Login
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="id">아이디</label>
          </div>
          <input
            id="id"
            type="text"
            name="id"
            value={login.id || ''}
            onChange={onChange}
            maxLength="5"
            required
          />
          <div>{idError}</div>
        </div>
        <div>
          <div>
            <label htmlFor="password">비밀번호</label>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            value={login.password || ''}
            onChange={onChange}
            maxLength="10"
            required
          />
          <div>{pwError}</div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
