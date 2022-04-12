import MainInfo from '../components/MainInfo';
import MainFeatures from '../components/MainFeatures';
import MainRoundedBox from '../components/MainRoundedBox';

import './Login.css';
import React from 'react';

const Login = props => {
    return (
        <React.Fragment>
            <MainInfo />
            <MainFeatures />
            <MainRoundedBox />
        </React.Fragment>
    );
}

export default Login;