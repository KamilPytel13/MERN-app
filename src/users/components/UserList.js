import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import './UserList.css';

const UserList = props => {
    if(props.users.length === 0) {
        return (
        <div className='center'>
            <Card >
            <h2>No users found.</h2>
            </Card>
        </div>
        );
    }

    return (
        <ul className="users-list">
            {props.users.map(user => {
                return <UserItem 
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                apartment={user.apartment}
                />
            })}
        </ul>
    );
};

export default UserList;