import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  receivePhotoLocation,
  sendSeekLocation,
  receiveEndTime
} from '../actions';
import PhotoDiv from '../components/PhotoDiv';
import Timer from '../components/Timer';
import { getGeoLocation } from '../utils/getGeoLocation';

function Seek({ endTime }) {
  const seek = useSelector(state => state.seek);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();
  let tempLocation;

  useEffect(() => {
    socket.on('hideData', async data => {
      dispatch(receivePhotoLocation(data.photo, data.location));
      tempLocation = await getGeoLocation(
        socket,
        'seekData',
        dispatch,
        sendSeekLocation
      );
      socket.emit('notice', { recieve: 'ok' });
      socket.on('notice', data => {
        dispatch(receiveEndTime(data.time));
      });
    });
  }, []);

  if (endTime && seek.ready) {
    return (
      <>
        <Timer endTime={endTime} />
        <PhotoDiv photo={seek.photo} />
      </>
    );
  }

  return <div>꼭꼭 숨어라!!</div>;
}

export default Seek;
