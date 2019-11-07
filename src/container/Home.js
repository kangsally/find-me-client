import React from 'react';
import HomeDiv from '../components/HomeDiv';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../actions';

function Home({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onClickLogout = () => {
    dispatch(logOut);
  };
  const onClickStartGame = () => {
    history.push('/game');
  };
  return (
    <HomeDiv
      logout={onClickLogout}
      startGame={onClickStartGame}
      id={user.id}
      point={user.point}
    ></HomeDiv>
  );
}

export default Home;
