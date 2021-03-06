import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = ({ onSubmit, onChange, login, idError, pwError }) => {
  return (
    <div className="container">
      <div className="login-box">
        <form className="login-form" onSubmit={onSubmit}>
          <div className="id-div">
            <div className="label-div">
              <label htmlFor="id">아이디</label>
            </div>
            <input
              id="id"
              type="text"
              name="id"
              value={login.id || ''}
              onChange={onChange}
              maxLength="8"
              required
            />
            <div className="error-div">{idError}</div>
          </div>
          <div className="pw-div">
            <div className="label-div">
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
            <div className="error-div">{pwError}</div>
          </div>
          <div className="button-div">
            <button type="submit" text-hover="안녕">
              로그인
            </button>
          </div>
        </form>
        <div className="link-div">
          <Link to="/join">Join</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
