import React, { useState, useRef } from 'react';
import { BrowserRouter,Route,Link,Switch } from "react-router-dom"

function Home() {
  
  return (
    <>
      <div>
        홈입니다!
      </div>
      <Link to='/Login'>로그인</Link>
    </>
  );
}

export default Home;