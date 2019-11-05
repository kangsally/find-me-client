import React from 'react';

function Home({ history }) {
  console.log(history);
  const onClick = () => {
    history.push('/game');
  };
  return (
    <div>
      home
      <div>
        <button onClick={onClick}>시작하기</button>
      </div>
    </div>
  );
}

export default Home;
