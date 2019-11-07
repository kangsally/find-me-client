import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { typeLoginForm, logIn } from '../actions';
import { postLogin } from '../api';

function Login({ history }) {
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  const onChange = event => {
    const { value, name } = event.target;
    dispatch(typeLoginForm({ name, value }));
    if (name === 'id' && idError !== '') {
      setIdError('');
    }
    if (name === 'password' && pwError !== '') {
      setPwError('');
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    const { id, password } = login;
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      return;
    }

    if (password === '') {
      setPwError('패스워드를 입력해주세요.');
      return;
    }
    try {
      const response = await postLogin({
        id: id,
        password: password
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(logIn(response.data.id, response.data.point));
        history.push('/');
      }
    } catch (error) {
      if(error.response){
        const { response } = error;
        if (response.data.error === 'Incorrect id') {
          setIdError('존재하지 않는 아이디입니다.');
        }
        if (response.data.error === 'Incorrect password') {
          setPwError('비밀번호가 일치하지 않습니다.');
        }
      }else{
        console.log(error);
      }
    }
  };

  return (
    <LoginForm 
      onChange={onChange}
      onSubmit={onSubmit}
      idError={idError}
      pwError={pwError}
      login={login}
    />
  );
}

export default Login;
