import { useContext } from 'react'

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/authContext';
import './Register.css';

const Register = () => {
    const auth = useContext(AuthContext);
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        surname: {
            value: '',
            isValid: false
        },
        apartment: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const authHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    return (
        <Card className='register'>
            <h2>Register</h2>
            <hr />
            <form onSubmit={authHandler}> 
                <Input 
                element='input' 
                id='name' 
                type='text' 
                label='Name' 
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your name.' 
                onInput={inputHandler}
                />
                <Input 
                element='input' 
                id='surname' 
                type='text' 
                label='Surname' 
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your surname.' 
                onInput={inputHandler}
                />
                <Input 
                element='input' 
                id='apartment' 
                type='number' 
                label='Apartment' 
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your apartment number.' 
                onInput={inputHandler}
                />
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
                <Button type='submit' disabled={!formState.isValid}>REGISTER</Button>
            </form>
        </Card>
    );
}

export default Register;