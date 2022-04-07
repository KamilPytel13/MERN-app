import { Link } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import './MainInfo.css';

const MainInfo = props => {
    return (
        <div className='main-info'>
            <h1>Log in or sign up to the community</h1>
            <h3>
                This app lets you see what is going on in your neighbourhood.
                You can check upcoming maintenance schedule or plan other events!
            </h3>
            <Link to='/register-page'>
                <Button >REGISTER</Button>
            </Link>
        </div>
    );
}

export default MainInfo;