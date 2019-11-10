import React, { useState, useEffect } from 'react';
import CameraDiv from '../components/CameraDiv';
import Counter from '../components/Counter';
import Map from '../components/Map';
import Timer from '../components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import {
  takePhoto,
  sendPhotoLocation,
  receiveSeekLocation,
  receiveEndTime
} from '../actions';
import { getCurrentGeoLocation } from '../utils/getGeoLocation';

function Hide({ endTime }) {
  const hide = useSelector(state => state.hide);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();
  console.log(endTime);
  useEffect(() => {
    socket.on('seekData', data => {
      dispatch(receiveSeekLocation(data.location));
    });
    socket.on('notice', data => {
      dispatch(receiveEndTime(data.time))
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
// console.log(endTime);
  if (!hide.ready) {
    return (
      <>
        <Counter sendPhotos={sendPhotos} />
        <CameraDiv
          takePhotos={takePhotos}
          photo={hide.photo}
          sendPhotos={sendPhotos}
        />
      </>
    );
  }
  if (endTime && hide.ready && hide.partnerLocation) {
    return (
      <>
        <Timer endTime={endTime} />
        <Map location={hide.partnerLocation} />
      </>
    );
  }

  return <div>로딩중</div>;
}

export default Hide;
