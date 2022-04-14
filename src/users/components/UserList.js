import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import './UserList.css';

const UserList = props => {
    return (
        <ul className="users-list">
            {props.users.map(user => {
                return <UserItem 
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                />
            })}
        </ul>
    );
};

export default UserList;