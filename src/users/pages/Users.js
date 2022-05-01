import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import UserList from '../components/UserList';

const Users = props => {
    const USERS = [
        {
            id: 1,
            name: 'User',
            surname: '1'
        }
    ];

    return (
        <>
            <SubMainNavigation />
            <UserList users={USERS} />
        </>
    );
};

export default Users;