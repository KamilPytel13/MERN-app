import React, { useEffect, useState } from 'react';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import UserList from '../components/UserList';
//import UserItem from '../components/UserItem';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            
            try {
                const response = await fetch('http://localhost:5002/api/users');
                const responseData = await response.json();

                if(!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
                setIsLoading(false);
            } catch(err) {
                setError(err.message);
            }
        
            setIsLoading(false);
        }
        
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
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