import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingApp } from '../actions';
import './InitialLoading.scss';

function InitialLoading() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const titleName = '나를 찾아줘';
    let i = 0;

    const typeTitle = () => {
      if (i < titleName.length) {
        setTitle(title => (title += titleName.charAt(i)));
        i++;
        setTimeout(typeTitle, 700);
        if (i === titleName.length) {
          setTimeout(() => {
            dispatch(loadingApp);
          }, 2000);
        }
      }
    };
    typeTitle();
  }, []);
  return (
    <div className="initial-container">
      <div className="title-div">{title}</div>
    </div>
  );
}

export default InitialLoading;
