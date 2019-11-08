import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receivePhoto } from '../actions';
import PhotoDiv from '../components/PhotoDiv';

function Seek() {
  const seek = useSelector(state => state.seek);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('hideData', data => {
      dispatch(receivePhoto(data.photo));
    });
  }, []);

  if (!seek.ready) {
    return <div>꼭꼭 숨어라!!</div>;
  } else {
    return <PhotoDiv photo={seek.photo} />;
  }
}

export default Seek;
