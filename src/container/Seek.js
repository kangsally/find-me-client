import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import PhotoDiv from '../components/PhotoDiv';
import Timer from '../components/Timer';
import ReceiveMessage from '../components/ReceiveMessage';
import HintButtons from '../components/HintButtons';
import HintMap from '../components/HintMap';
import SeekWaiting from '../components/SeekWaiting';
import { postLocation } from '../api';
import { getGeoLocation, getDistance } from '../utils/getGeoLocation';
import '../App.scss';

function Seek({ endTime, finish }) {
  const seek = useSelector(state => state.seek);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('hideData', async data => {
      const facilityLocation = await postLocation(data.location);
      const geoLocationId = await getGeoLocation(
        socket,
        'seekData',
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
      socket.emit('notice', { recieve: 'ok' });
      socket.on('notice', data => {
        dispatch(receiveEndTime(data.time));
      });
      socket.on('message', data => {
        dispatch(receiveMessage(data.message));
      });
    });
    socket.on('hideFinish', ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit('end', { data: 'finish' });
    });
    socket.on('disconnected', ({ result, finishMessage }) => {
      dispatch(finishGame(result, finishMessage));
      socket.emit('end', { data: 'finish' });
    });
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
