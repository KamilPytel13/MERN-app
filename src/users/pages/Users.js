import React, { useEffect, useState } from 'react';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import UserList from '../components/UserList';
//import UserItem from '../components/UserItem';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttp } from '../../shared/hooks/http-hook';


const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttp();

    useEffect(() => {
        const getUsers = async() => {
            try {
                const responseData = await sendRequest('http://localhost:5002/api/users');
                setLoadedUsers(responseData.users);
            } catch(err) {
            }
        }
        getUsers();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
             <div className='center'>
                <LoadingSpinner />
             </div>
            )}
            <SubMainNavigation />
            {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
        </>
    );
};

export default Users;