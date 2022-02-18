import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import validateUserCredentials from '../validateUserCredentials.mjs';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertStyle, setAlertStyle] = useState('hidden');
    const [alertMsg, setAlertMsg] = useState('');
    const [emailFieldStyle, setEmailFieldStyle] = useState('');
    const [passwordFieldStyle, setPasswordFieldStyle] = useState('');
    const [confirmPasswordFieldStyle, setConfirmPasswordFieldStyle] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    const navigate = useNavigate();

    const { register } = useAuth();

    // const { register } = useAuth();

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    async function handleSubmit(e : any) : Promise<void> {
        e.preventDefault();

        let emailEmpty : boolean = false;
        let passwordEmpty : boolean = false;
        let confirmPasswordEmpty : boolean = false;

        setLoadingState(true);
        setAlertMsg('');
        setAlertStyle('hidden');

        if (email.length < 1) {
            setAlertStyle('shown failure');
            setAlertMsg('You did not enter an email.');
            setEmailFieldStyle('invalidField');
            emailEmpty = true;
        } else {
            setEmailFieldStyle('');
        }
        
        if (password.length < 1) {
            setAlertStyle('shown failure');
            setAlertMsg(prev => prev + ' You did not enter a password.');
            setPasswordFieldStyle('invalidField');
            passwordEmpty = true;
        }  else {
            setPasswordFieldStyle('');
        }
        
        if (confirmPassword.length < 1) {
            setAlertStyle('shown failure');
            setAlertMsg(prev => prev + ' You did not confirm your password.');
            setConfirmPasswordFieldStyle('invalidField');
            confirmPasswordEmpty = true;
        } else {
            setConfirmPasswordFieldStyle('');
        }

        if (emailEmpty || passwordEmpty || confirmPasswordEmpty) {
            setLoadingState(false);
            return;
        }

        if (!(password === confirmPassword)) {
            setAlertStyle('shown failure');
            setAlertMsg('Passwords do not match.');
            setLoadingState(false);
            return;
        }

        const validateRes = validateUserCredentials(email, password);

        if (!validateRes[1]) {
            setAlertStyle('shown failure');
            setAlertMsg('Invalid password. Security level: weak.' );
        } if (!validateRes[0]) {
            setAlertStyle('shown failure');
            setAlertMsg(prev => 'Invalid Email. ' + prev);
        }

        if ((!validateRes[0]) || (!validateRes[1])) {
            setLoadingState(false);
            return
        }

        setAlertStyle('shown success');
        setAlertMsg('Success, signing you in now!');
        setLoadingState(true);
        console.log('successfully validated');

        try {
            await register(email, password);
        } catch {
            setAlertMsg('Failed to create an account.');
            setAlertStyle('shown failure');
        }

        setLoadingState(false);
        navigate('/directory');
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Register</h1>
                <form>
                    <div>
                        <label className='nonSelect' >email</label>
                        <input disabled={loadingState} type='text' name='email' value={email} onChange={handleChange} autoComplete='email' className={emailFieldStyle} />
                    </div>
                    <div>
                        <label className='nonSelect' >password</label>
                        <input disabled={loadingState} type='password' name='password' value={password} onChange={handleChange} autoComplete='password' className={passwordFieldStyle} />
                    </div>
                    <div>
                        <label className='nonSelect' >confirm password</label>
                        <input disabled={loadingState} type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} autoComplete='off' className={confirmPasswordFieldStyle} />
                    </div>
                </form>
                <div id='alertMessage' className={alertStyle}>{alertMsg}</div>
                <button onClick={handleSubmit} disabled={loadingState}>Submit</button>
            </div>
            <p>Already have an account? <Link to='/signin' className='registerLink' >Sign In.</Link></p>
        </div>
    )
}