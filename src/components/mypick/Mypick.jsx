import React, { useState } from 'react';
import Mystory from "./mystory/Mystory";
import Myplace from "./myplace/Myplace";

export default function Mypick() {
  const [mode, setMode] = useState(true);
  const handleMode = () => {
    setMode(!mode);
  }
  return (
    <>
      {mode ?
        <div style={{}}>
          <Myplace handleMode={handleMode}/>
        </div>
        :
        <div style={{}}>
          <Mystory handleMode={handleMode}/>
        </div>
      }
    </>
  )
}

