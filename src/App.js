import React from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home'
import Signin from './pages/auth/Signin';
import Login from './pages/auth/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} element={<Home />}></Route>
        {/* <Route path="/" exact={true} component={Home}></Route> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signin" element={<Signin />} />
      </Switch>
    </Router>
  );
}

export default App