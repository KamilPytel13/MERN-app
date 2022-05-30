import Card from "../../shared/components/UIElements/Card";
import './UserItem.css';

const EventItem = props => {
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <div className='user-item__info'>
                    <h2>Title: {props.title}</h2>
                    <h2>Description: {props.description}</h2>
                    <h2>Place: {props.place}</h2>
                    <h2>Date: {props.date}</h2>
                    <h2>Time: {props.time}</h2>
                    <h2>Created by: {props.creator}</h2>
                </div>
            </Card>
        </li>
    );
};

export default EventItem;