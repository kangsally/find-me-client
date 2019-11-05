import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_API } from '../api/sockets';
import { getGeoLocation } from '../utils/getGeoLocation';

function Game() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    const socket = io(SOCKET_API);
    const connectToSocket = () => {
      socket.emit('userInfo', { id: isLoggedIn.id });
      getGeoLocation(socket);
    };

    connectToSocket();
  }, []);

  return <div>로딩</div>;
}

export default Game;
