import React from 'react';
import { Link } from 'react-router-dom';
import './JoinForm.scss';

const JoinForm = ({ onSubmit, onChange, join, idError, pwError }) => {
  return (
    <div className="container">
      <div className="join-box">
        <form className="join-form" onSubmit={onSubmit}>
          <div className="id-div">
            <div className="label-div">
              <label htmlFor="id">아이디</label>
            </div>
            <input
              id="id"
              type="text"
              name="id"
              value={join.id || ''}
              onChange={onChange}
              maxLength="10"
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
              value={join.password || ''}
              onChange={onChange}
              maxLength="10"
              required
            />
            <div className="error-div">{pwError}</div>
          </div>
          <div className="pw-div">
            <div className="label-div">
              <label htmlFor="password">비밀번호 확인</label>
            </div>
            <input
              id="passwordToCheck"
              type="password"
              name="passwordToCheck"
              value={join.passwordToCheck || ''}
              onChange={onChange}
              maxLength="10"
              required
            />
          </div>
          <div className="button-div">
            <button type="submit" text-hover="반가워">
              회원가입
            </button>
          </div>
        </form>
        <div className="link-div">
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
