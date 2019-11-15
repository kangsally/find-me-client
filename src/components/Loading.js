import React, { useState, useEffect } from 'react';
import './Loading.scss';

function Loading() {
  return (
    <div className="loading-container">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  );
}

export default Loading;
