import React, { useState, useEffect } from 'react';
import CameraDiv from '../components/CameraDiv';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { takePhoto, sendPhoto } from '../actions';

function Hide() {
  const hide = useSelector(state => state.hide);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();
  const takePhotos = photoData => {
    dispatch(takePhoto(photoData));
  };
  const sendPhotos = () => {
    dispatch(sendPhoto);
    socket.emit('hideData', { photo: hide.photo });
  };

  if (!hide.ready) {
    return (
      <>
        <Counter sendPhotos={sendPhotos}/>
        <CameraDiv
          takePhotos={takePhotos}
          photo={hide.photo}
          sendPhotos={sendPhotos}
        />
      </>
    );
  }
}

export default Hide;
