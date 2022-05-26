import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <div className='user-item__info'>
                    <h2>Name: {props.name}</h2>
                    <h2>Surname: {props.surname}</h2>
                    <h3>Apartment: {props.apartment}</h3>
                </div>
            </Card>
        </li>
    );
}

export default UserItem;