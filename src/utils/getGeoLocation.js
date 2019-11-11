export const getGeoLocation = (socket, socketName, dispatch, action) => {
  let temp;
  const successCallBack = position => {
    socket.emit(`${socketName}`, {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    if (socketName === 'seekData') {
      dispatch(
        action({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      );
    }
  };
  const errorCallback = error => {
    console.log(error);
  };

  const options = {
    enableHighAccuracy: true,
    // timeout: 0,
    maximumAge: 0
  };

  if (navigator.geolocation) {
    temp = navigator.geolocation.watchPosition(
      successCallBack,
      errorCallback,
      options
    );
  }

  // setTimeout(() => {
  //   navigator.geolocation.clearWatch(temp);
  // }, 50000);
  return temp;
};

export const getDistance = (myLat, myLng, partnerLat, partnerLng) => {
  const earthRadius = 6371;
  const distance =
    Math.acos(
      Math.sin(myLat) * Math.sin(partnerLat) +
        Math.cos(myLat) * Math.cos(partnerLat) * Math.cos(myLng - partnerLng)
    ) * earthRadius;

  return distance;
};
