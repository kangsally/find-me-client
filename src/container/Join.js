import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JoinForm from '../components/JoinForm';
import { typeJoinForm } from '../actions';
import { postJoin } from '../api';

function Join({ history }) {
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const join = useSelector(state => state.join);
  const dispatch = useDispatch();

  const onChange = event => {
    const { value, name } = event.target;
    dispatch(typeJoinForm({ name, value }));
    if (name === 'id' && idError !== '') {
      setIdError('');
    }
    if ((name === 'password' || name === 'passwordToCheck') && pwError !== '') {
      setPwError('');
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    const passwordReg = new RegExp(
      '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,10}$'
    );
    const { id, password, passwordToCheck } = join;

    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      return;
    }

    if (password === '' || passwordToCheck === '') {
      setPwError('패스워드를 입력해주세요.');
      return;
    }

    if (!passwordReg.test(password)) {
      setPwError(
        '패스워드는 숫자와 영문 포함 6자 이상 10자 이하로 입력해주세요.'
      );
      return;
    }

    if (password !== passwordToCheck) {
      setPwError('패스워드가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await postJoin({
        id: id,
        password: password
      });
      if (response.data === 'Already existed id') {
        setIdError('이미 존재하는 아이디입니다.');
        return;
      }
      if (response.status === 200) {
        history.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <JoinForm
      onChange={onChange}
      onSubmit={onSubmit}
      idError={idError}
      pwError={pwError}
      join={join}
    />
  );
}

export default Join;
