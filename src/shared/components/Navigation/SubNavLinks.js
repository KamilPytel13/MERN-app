import { Outlet, NavLink } from 'react-router-dom';
import NavWeather from './NavWeather';

import './SubNavLinks.css';

const SubNavLinks = props => {
    return (
        <>
            <ul className='subnav-links'>
                <li className='weather'>
                    <NavWeather />
                </li>
                <li>
                    <NavLink to="../home-page">Home</NavLink>
                </li>
                <li>
                    <NavLink to="../events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="../calendar">Calendar</NavLink>
                </li>
                <li>
                    <NavLink to="../users">Users</NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    );
};

export default SubNavLinks;