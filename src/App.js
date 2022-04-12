import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Login from './home/pages/Login';
import Home from './home/pages/Home';
import Events from './home/pages/Events';
import Calendar from './home/pages/Calendar';

function App() {
  return (
    <Router>
      <MainNavigation />
        <main>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='home-page' element={<Home />} />
            <Route path='home-page/events' element={<Events />} />
            <Route path='home-page/calendar' element={<Calendar />} />
          </Routes>
        </main>
    </Router>
  )
}

export default App;
