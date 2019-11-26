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
  finishGame
} from '../actions';
import {
  HIDE_DATA,
  SEEK_DATA,
  NOTICE,
  MESSAGE,
  END,
  DISCONNECT,
  DISCONNECTED,
  SEEK_FINISH
} from '../constants/events';
import '../App.scss';

function Hide({ endTime, finish }) {
  const hide = useSelector(state => state.hide);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(SEEK_DATA, data => {
      dispatch(receiveSeekLocation(data.location));
    });
    socket.on(NOTICE, data => {
      dispatch(receiveEndTime(data.time));
    });
    socket.on(SEEK_FINISH, ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit(END, { data: 'finish' });
    });
    socket.on(DISCONNECTED, ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit(END, { data: 'finish' });
    });
    socket.on(DISCONNECT, () => {
      dispatch(finishGame('에러', '서버와의 연결이 끊겼어요.'));
    });
  }, []);

  const takePhotos = photoData => {
    dispatch(takePhoto(photoData));
  };

  const sendPhotos = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        socket.emit(HIDE_DATA, {
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
        dispatch(finishGame('에러', '위치를 전송하지 못했어요.'));
      }
    );
  };

  const emitMessage = async message => {
    await socket.emit(MESSAGE, { message: message });
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
      <div className="hide-container">
        <Timer endTime={endTime} type="hide" />
        <Map location={hide.partnerLocation} type="hide" />
        <SendMessage emitMessage={emitMessage} />
      </div>
    );
  }

  return <Loading />;
}

export default Hide;
