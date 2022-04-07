import { Link } from 'react-router-dom';
import { useState } from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import NavWeather from './NavWeather';
import './MainNavigation.css';

const MainNavigation = props => {
    return (
        <MainHeader>
            <h1 className='main-navigation__title'>
                <Link to='/'>Community App</Link>
            </h1>
            {/* <h1 className='main-navigation__weather'>
                <Link to='/'>Weather</Link>
            </h1> */}
            <h1 className='main-navigation__weather'>
                <NavWeather />
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
    );
}

export default MainNavigation;