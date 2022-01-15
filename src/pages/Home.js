import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <div>리스트</div>
      <div>지도</div>
      <br/>
      <Link to="/auth">로그인</Link>
    </div>

  );
};

export default Home;