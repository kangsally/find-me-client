import React, { useState, useEffect } from 'react';
import './HomeDiv.scss';

function HomeDiv({ logout, startGame, id, point }) {
  return (
    <div className="home-container">
      <div className="header">
        <div className="title-box">
          <p className="id">나를 찾아줘</p>
        </div>
        <div className="user-box">
          <p className="point">{id}</p>
          <p className="point">{point} p</p>
          <button className="logout-button" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="start-button-div">
        <button onClick={startGame} text-hover="나를 찾아줘">
          시작하기
        </button>
      </div>
    </div>
  );
}

export default HomeDiv;
