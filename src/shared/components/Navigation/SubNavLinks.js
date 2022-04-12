import { Outlet, NavLink } from 'react-router-dom';

import './SubNavLinks.css';

const SubNavLinks = props => {
    return (
        <>
            <ul className='subnav-links'>
                <li>
                    <NavLink to="">Home</NavLink>
                </li>
                <li>
                    <NavLink to="events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="calendar">Calendar</NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    );
};

export default SubNavLinks;