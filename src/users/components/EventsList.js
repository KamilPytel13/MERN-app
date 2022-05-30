import EventItem from './EventItem';
import './UserList.css';

const EventsList = props => {
    return (
        <ul className="users-list">
            {props.events?.map(event => {
                return <EventItem 
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                place={event.place}
                date={event.eventDate}
                time={event.eventTime}
                creator={event.creator}
                />
            })}
        </ul>
    );
};

export default EventsList;