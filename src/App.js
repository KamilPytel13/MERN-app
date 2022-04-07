import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './home/pages/Home';

function App() {
  return (
    <Router>
      <MainNavigation />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
    </Router>
  )
}

export default App;
