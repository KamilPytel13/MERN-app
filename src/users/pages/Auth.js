import React, { useContext, useState } from 'react'

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/http-hook';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const authHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest('http://localhost:5002/api/users/login', 
                'POST',
                JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                {
                    'Content-Type': 'application/json'
                });
            auth.login(responseData.user.id);
        } catch(err) {
            
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Welcome Back!</h2>
                <h3>Please Login</h3>
                <hr />
                <form onSubmit={authHandler}> 
                    <Input 
                    element='input' 
                    id='email' 
                    type='email' 
                    label='E-mail' 
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address.' 
                    onInput={inputHandler}
                    />
                    <Input 
                    element='input' 
                    id='password' 
                    type='password' 
                    label='Password' 
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid password.' 
                    onInput={inputHandler}
                    />
                    <Button type='submit' disabled={!formState.isValid}>SIGN IN</Button>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default Auth;