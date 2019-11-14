import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import GameWaiting from '../components/GameWaiting';
import Ending from '../components/Ending';
import Hide from './Hide';
import Seek from './Seek';
import { SOCKET_API } from '../api/sockets';
import { getGeoLocation } from '../utils/getGeoLocation';
import { startGame, finishGame, backToHome } from '../actions';
const _ = require('lodash');

function Game({ history }) {
  const user = useSelector(state => state.user);
  const game = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_API);
    const connectToSocket = async () => {
      socket.emit('userInfo', { id: user.id });

      const tempLocation = await getGeoLocation(socket, 'userLocation');

      socket.on('start', data => {
        const role = _.findKey(data, value => {
          return value === user.id;
        });
        navigator.geolocation.clearWatch(tempLocation);
        dispatch(startGame(role, socket));
      });
    };

    connectToSocket();
  }, []);

  const hideFinish = (result, finishMessage) => {
    game.socket.emit('hideFinish', {
      result: result,
      finishMessage: finishMessage
    });
    dispatch(finishGame(result, finishMessage));
  };

  const seekFinish = (result, finishMessage) => {
    game.socket.emit('seekFinish', {
      result: result,
      finishMessage: finishMessage
    });
    dispatch(finishGame(result, finishMessage));
  };

  const onClick = () => {
    dispatch(backToHome);
    history.push('/');
  };

  if (game.result) {
    return (
      <Ending
        result={game.result}
        finishMessage={game.finishMessage}
        onClick={onClick}
      />
    );
  }

  if (!game.isStarted) {
    return <GameWaiting />;
  } else {
    if (game.role === 'hide') {
      return <Hide endTime={game.endTime} finish={hideFinish} />;
    } else if (game.role === 'seek') {
      return <Seek endTime={game.endTime} finish={seekFinish} />;
    }
  }
}

export default Game;
