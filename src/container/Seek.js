import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  receivePhotoLocation,
  sendSeekLocation,
  receiveEndTime,
  receiveMessage,
  activateFirstHintButton,
  activateSecondHintButton,
  showPhoto,
  hidePhoto,
  showMap,
  hideMap
} from '../actions';
import PhotoDiv from '../components/PhotoDiv';
import Timer from '../components/Timer';
import ReceiveMessage from '../components/ReceiveMessage';
import HintButtons from '../components/HintButtons';
import HintMap from '../components/HintMap';
import { postLocation } from '../api';
import { getGeoLocation, getDistance } from '../utils/getGeoLocation';

function Seek({ endTime }) {
  const seek = useSelector(state => state.seek);
  const socket = useSelector(state => state.game.socket);
  const dispatch = useDispatch();
  let tempLocation;

  useEffect(() => {
    socket.on('hideData', async data => {
      const facilityLocation = await postLocation(data.location);

      dispatch(
        receivePhotoLocation(data.photo, data.location, facilityLocation.data.data)
      );
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
      socket.on('message', data => {
        dispatch(receiveMessage(data.message));
      });
    });
  }, []);

  const activateHints = milliseconds => {
    if (Math.floor(milliseconds / 10000) * 10000 === 60000 * 9) {
      dispatch(activateFirstHintButton);
    }
    if (Math.floor(milliseconds / 10000) * 10000 === 60000 * 9) {
      dispatch(activateSecondHintButton);
    }
  };

  const onClick = (hint, fisrtHint, secondHint, callback) => {
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
      callback(text);
    }

    if (hint === 'second' && secondHint) {
      dispatch(showMap);
    }
  };

  console.log(seek.hintLocation, seek.isShownMap);
  if (seek.isShownMap) {
    return <HintMap hint={seek.hintLocation} />;
  }
  if (endTime && seek.ready) {
    return (
      <div className="seek-container">
        <Timer endTime={endTime} activateHints={activateHints} type="seek" />
        <PhotoDiv photo={seek.photo} />
        <HintButtons
          firstHint={seek.firstHint}
          secondHint={seek.secondHint}
          onClick={onClick}
        />
        <ReceiveMessage message={seek.message} />
      </div>
    );
  }

  return <div>꼭꼭 숨어라!!</div>;
}

export default Seek;
