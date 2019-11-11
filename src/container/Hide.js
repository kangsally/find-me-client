import React, { useState, useEffect } from 'react';
import CameraDiv from '../components/CameraDiv';
import Counter from '../components/Counter';
import Map from '../components/Map';
import Timer from '../components/Timer';
import SendMessage from '../components/SendMessage';
import { useSelector, useDispatch } from 'react-redux';
import {
  takePhoto,
  sendPhotoLocation,
  receiveSeekLocation,
  receiveEndTime,
  typeMessage,
  sendMessage
} from '../actions';

function Hide({ endTime }) {
  const hide = useSelector(state => state.hide);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('seekData', data => {
      dispatch(receiveSeekLocation(data.location));
    });
    socket.on('notice', data => {
      dispatch(receiveEndTime(data.time));
    });
  });

  const takePhotos = photoData => {
    dispatch(takePhoto(photoData));
  };

  const sendPhotos = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        socket.emit('hideData', {
          photo: hide.photo,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
        dispatch(
          sendPhotoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        );
      },
      error => {
        console.log(error);
      }
    );
  };

  const onChange = event => {
    const { value, name } = event.target;
    dispatch(typeMessage(value));
  };

  const onSubmit = async event => {
    event.preventDefault();
    socket.emit('message', { message: hide.message });
    dispatch(sendMessage);
  };

  if (!hide.ready) {
    return (
      <div className="seek-container">
        <Counter sendPhotos={sendPhotos} />
        <CameraDiv
          takePhotos={takePhotos}
          photo={hide.photo}
          sendPhotos={sendPhotos}
        />
      </div>
    );
  }
  if (endTime && hide.ready && hide.partnerLocation) {
    return (
      <div className="seek-container">
        <Timer endTime={endTime} type="hide" />
        <Map location={hide.partnerLocation} type="hide" />
        <SendMessage
          message={hide.message}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    );
  }

  return <div>로딩중</div>;
}

export default Hide;
