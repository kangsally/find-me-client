export const getGeoLocation = (socket, socketName) => {
  let temp;
  const successCallBack = position => {
    // console.log(new Date(position.timestamp));
    socket.emit(`${socketName}`, { 
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };
  const errorCallback = error => {
    console.log(error);
  };

  const options = {
    enableHighAccuracy: true,
    // timeout: 0,
    maximumAge: 0,
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
