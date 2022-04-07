import { Outlet, NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = props => {
    return (
        <>
            <ul className='nav-links'>
                <li>
                    <NavLink to="/">HOME</NavLink>
                </li>
                <li>
                    <NavLink to="login-page">LOGIN</NavLink>
                </li>
                <li>
                    <NavLink to="register-page">REGISTER</NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    );
};

export default NavLinks;