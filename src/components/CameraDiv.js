import React, { useState, useEffect } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './CameraDiv.scss';

function CameraDiv({ takePhotos, photo, sendPhotos }) {

  const onTakePhotos = photoData => {
    takePhotos(photoData);
  };
if (photo.length === 3) {
    sendPhotos();
    return;
  }
  return (

    <div>
      <div className="camera-div">
        <Camera
          className="camera"
          imageType={IMAGE_TYPES.JPG}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          onTakePhoto={photoData => {
            onTakePhotos(photoData);
          }}
          // isFullscreen={false}
          // idealResolution={{ width: 640, height: 480 }}
        />
      </div>
    </div>
  );
}

export default CameraDiv;
