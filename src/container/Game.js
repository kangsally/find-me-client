import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import GameWaiting from '../components/GameWaiting';
import Hide from '../components/Hide';
import { SOCKET_API } from '../api/sockets';
import { getGeoLocation } from '../utils/getGeoLocation';
import { startGame } from '../actions';
const _ = require('lodash');

function Game() {
  const user = useSelector(state => state.user);
  const game = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_API);
    const connectToSocket = () => {
      socket.emit('userInfo', { id: user.id });
      getGeoLocation(socket);
      socket.on('start', data => {
        const role = _.findKey(data, value => {
          return value === user.id;
        });
        dispatch(startGame(role));
      });
    };
    connectToSocket();
  }, []);

  console.log(game);

  if (!game.isStarted) {
    return <GameWaiting />;
  } else {
    if (game.role === 'hide') {
      return <Hide>숨는사람</Hide>;
    } else if (game.role === 'seek') {
      return <div>찾는 사람</div>;
    }
  }
}

export default Game;
