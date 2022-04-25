import { Outlet, NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/authContext';
import NavWeather from './NavWeather';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
      <>
        <ul className="nav-links">
          {/* {auth.isLoggedIn && (
            <li>
              <NavLink to="home-page">HOME</NavLink>
            </li>
          )} */}
          {!auth.isLoggedIn && (
            <li>
              <NavLink to="login-page">LOGIN</NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink to="register-page">REGISTER</NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
              <li>
                  <button onClick={auth.logout}>LOGOUT</button>
              </li>
          )}
        </ul>

        <Outlet />
      </>
    );
};

export default NavLinks;