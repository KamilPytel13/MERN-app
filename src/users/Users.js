import SubMainNavigation from '../shared/components/Navigation/SubMainNavigation';
import UserList from './components/UserList';

const Users = props => {
    const USERS = [
        {
            id: 1,
            name: 'Kami',
            surname: 'Pyc'
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