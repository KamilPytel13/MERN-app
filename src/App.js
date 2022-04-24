import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Login from './home/pages/Login';
import Home from './home/pages/Home';
import Events from './home/pages/Events';
import Calendar from './home/pages/Calendar';
import Users from './users/pages/Users';
import Auth from './users/pages/Auth';
import Register from './users/pages/Register';
import { AuthContext } from './shared/context/authContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>        
        {/* <Route path='/' element={<Navigate replace to='/home-page' />} />  */}
        <Route path='/home-page' element={<Home />} />
        <Route path='/events' exact element={<Events />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={<Navigate replace to='/home-page' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login-page' element={<Auth />} />
        <Route path='/register-page' element={<Register />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
