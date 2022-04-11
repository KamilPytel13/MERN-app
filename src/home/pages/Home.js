import MainInfo from '../components/MainInfo';
import MainFeatures from '../components/MainFeatures';
import MainRoundedBox from '../components/MainRoundedBox';

import './Home.css';
import React from 'react';

const Home = props => {
    return (
        <React.Fragment>
            <MainInfo />
            <MainFeatures />
            <MainRoundedBox />
        </React.Fragment>
    );
}

export default Home;