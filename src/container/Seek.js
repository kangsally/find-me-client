import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhotoDiv from '../components/PhotoDiv';
import Timer from '../components/Timer';
import ReceiveMessage from '../components/ReceiveMessage';
import HintButtons from '../components/HintButtons';
import HintMap from '../components/HintMap';
import SeekWaiting from '../components/SeekWaiting';
import {
  receivePhotoLocation,
  sendSeekLocation,
  receiveEndTime,
  receiveMessage,
  activateFirstHintButton,
  activateSecondHintButton,
  showDistance,
  showMap,
  hideMap,
  finishGame
} from '../actions';
import { postLocation } from '../api';
import { getGeoLocation, getDistance } from '../utils/getGeoLocation';
import {
  HIDE_DATA,
  SEEK_DATA,
  NOTICE,
  MESSAGE,
  HIDE_FINISH,
  END,
  DISCONNECT,
  DISCONNECTED
} from '../constants/events';
import '../App.scss';

function Seek({ endTime, finish }) {
  const seek = useSelector(state => state.seek);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(HIDE_DATA, async data => {
      const facilityLocation = await postLocation(data.location);
      const geoLocationId = await getGeoLocation(
        socket,
        SEEK_DATA,
        dispatch,
        sendSeekLocation
      );

      dispatch(
        receivePhotoLocation(
          data.photo,
          data.location,
          facilityLocation.data.data,
          geoLocationId
        )
      );
      socket.emit(NOTICE, { recieve: 'ok' });
      socket.on(NOTICE, data => {
        dispatch(receiveEndTime(data.time));
      });
      socket.on(MESSAGE, data => {
        dispatch(receiveMessage(data.message));
      });
    });
    socket.on(HIDE_FINISH, ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit(END, { data: 'finish' });
    });
    socket.on(DISCONNECTED, ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit(END, { data: 'finish' });
    });
    socket.on(DISCONNECT, () => {
      dispatch(finishGame('에러', '서버와의 연결이 끊겼어요.'));
    })

  }, []);

  const activateHints = milliseconds => {
    if (Math.floor(milliseconds / 1000) * 1000 === 60000 * 9.7) {
      dispatch(activateFirstHintButton);
    }
    if (Math.floor(milliseconds / 1000) * 1000 === 60000 * 9.5) {
      dispatch(activateSecondHintButton);
    }
  };

  const onClick = (hint, fisrtHint, secondHint) => {
    const { partnerLocation, myLocation } = seek;
    if (hint === 'first' && fisrtHint) {
      let text = '';
      partnerLocation.lat > myLocation.lat ? (text += '북') : (text += '남');
      partnerLocation.lng > myLocation.lng ? (text += '동') : (text += '서');
      text += ' ';
      text += getDistance(
        myLocation.lat,
        myLocation.lng,
        partnerLocation.lat,
        partnerLocation.lng
      );
      text += 'M';
      dispatch(showDistance(text));
    }

    if (hint === 'second' && secondHint) {
      dispatch(showMap);
    }
  };

  const onClinkHideMap = () => {
    dispatch(hideMap);
  };

  if (seek.isShownMap) {
    return <HintMap hint={seek.hintLocation} onClinkHideMap={onClinkHideMap} />;
  }
  if (endTime && seek.ready) {
    // if (
    //   getDistance(
    //     seek.myLocation.lat,
    //     seek.myLocation.lng,
    //     seek.partnerLocation.lat,
    //     seek.partnerLocation.lng
    //   ) < 5
    // ) {
    //   finish('success', '여기있었네..? 찾았다!');
    //   return '';
    // }

    return (
      <div className="seek-container">
        <Timer
          endTime={endTime}
          activateHints={activateHints}
          finish={finish}
          type="seek"
        />
        <PhotoDiv photo={seek.photo} />
        <HintButtons
          firstHint={seek.firstHint}
          secondHint={seek.secondHint}
          onClick={onClick}
          distance={seek.distanceHint}
        />
        <ReceiveMessage message={seek.message} />
        <div className="give-up-button-div">
          <button
            onClick={() => {
              finish('giveup', '못찾겠다 꾀꼬리 ㅠㅠ');
            }}
          >
            못찾겠다 꾀꼬리
          </button>
        </div>
      </div>
    );
  }

  return <SeekWaiting />;
}

export default Seek;
