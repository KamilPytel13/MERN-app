import React, { useState, useCallback, useEffect } from 'react';
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

let timer;

function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    //allow reloading the page by setting the token in local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      timer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(timer);
    }
  }, [token, logout, tokenExpirationDate]);

    //component only runs once when mounted - after all elements are rendered
  useEffect(() => {
      const localData = JSON.parse(localStorage.getItem('userData'));
      if (
        localData &&
        localData.token &&
        new Date(localData.expiration > new Date())
      ) {
        login(localData.userId, localData.token, new Date(localData.expiration));
      }
    }, [login]);

  let routes;

  if (token) {
    routes = (
      <Routes>        
        {/* <Route path='/' element={<Navigate replace to='/home-page' />} />  */}
        <Route path='/home-page' element={<Home />} />
        <Route path='/events' exact element={<Events />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/users/' element={<Users />} />
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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
