import React, { useEffect } from 'react';
import CameraDiv from '../components/CameraDiv';
import Counter from '../components/Counter';
import Map from '../components/Map';
import Timer from '../components/Timer';
import SendMessage from '../components/SendMessage';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import {
  takePhoto,
  sendPhotoLocation,
  receiveSeekLocation,
  receiveEndTime,
  typeMessage,
  sendMessage,
  finishGame
} from '../actions';
import '../App.scss';

function Hide({ endTime, finish }) {
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
    socket.on('seekFinish', ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit('end', { data: 'finish' });
    });
    socket.on('disconnected', ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit('end', { data: 'finish' });
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

  // const onChange = event => {
  //   const { value } = event.target;
  //   dispatch(typeMessage(value));
  // };

  const emitMessage = async message => {
    await socket.emit('message', { message: message });
  };

  if (!hide.ready) {
    return (
      <div className="hide-container">
        <Counter sendPhotos={sendPhotos} finish={finish} photo={hide.photo} />
        <CameraDiv
          takePhotos={takePhotos}
          photo={hide.photo}
          sendPhotos={sendPhotos}
          finish={finish}
        />
      </div>
    );
  }

  if (endTime && hide.ready && hide.partnerLocation) {
    return (
      <div className="hide-flex-container">
        <Timer endTime={endTime} type="hide" />
        <Map location={hide.partnerLocation} type="hide" />
        <SendMessage
          // message={hide.message}
          // onChange={onChange}
          emitMessage={emitMessage}
        />
      </div>
    );
  }

  return <Loading />;
}

export default Hide;
