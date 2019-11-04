import React from 'react';
import './JoinForm.scss';

const JoinForm = ({ onSubmit, onChange, join, idError, pwError }) => {
  // console.log(idError, pwError);
  return (
    <div>
      join
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="id">아이디</label>
          </div>
          <input
            id="id"
            type="text"
            name="id"
            value={join.id || ''}
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
            value={join.password || ''}
            onChange={onChange}
            maxLength="10"
            required
          />
          <div>{pwError}</div>
        </div>
        <div>
          <div>
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
        <div>
          <button type="submit">Join</button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
