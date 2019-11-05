export const getGeoLocation = socket => {
  let temp;
  const successCallBack = position => {
    console.log(position);
    socket.emit('userLocation', { 
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };
  const errorCallback = error => {
    console.log(error);
  };

  const options = {
    enableHighAccuracy: false,
    // timeout: 0,
    // maximumAge: 0
  };

  if (navigator.geolocation) {
    temp = navigator.geolocation.watchPosition(
      successCallBack,
      errorCallback,
      options
    );
  }

  setTimeout(() => {
    navigator.geolocation.clearWatch(temp);
  }, 50000);
};
