import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/SignIn.css';
import validateUserCredentials from '../validateUserCredentials.mjs';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertStyle, setAlertStyle] = useState('hidden');
    const [alertMsg, setAlertMsg] = useState('');
    const [emailFieldStyle, setEmailFieldStyle] = useState('');
    const [passwordFieldStyle, setPasswordFieldStyle] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    const navigate = useNavigate();

    const { signIn } = useAuth();

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'email') {
            setEmail(value);
        }
    }

    async function handleSubmit(e : any) : Promise<void> {
        e.preventDefault();

        let emailEmpty : boolean = false;
        let passwordEmpty : boolean = false;

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

        if (emailEmpty || passwordEmpty) {
            return;
        }

        const validateRes = validateUserCredentials(email, password);

        if (!validateRes[1]) {
            setAlertStyle('shown failure');
            setAlertMsg('Invalid password.' );
        } if (!validateRes[0]) {
            setAlertStyle('shown failure');
            setAlertMsg(prev => 'Invalid Email. ' + prev);
        }
        
        if ((!validateRes[0]) || (!validateRes[1])) {
            return
        }

        setAlertStyle('shown success');
        setAlertMsg('Success, signing you in now!');
        console.log('valid credentials, attempting to sign in.');

        let res;
        try {
            res = await signIn(email, password);
            navigate('/directory');
        } catch {
            setAlertMsg('Failed to sign you in.');
            setAlertStyle('shown failure');
        }

        console.log(res);

        setLoadingState(false);
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Sign In</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input disabled={loadingState} type='text' name='email' value={email} onChange={handleChange} autoComplete='email' className={emailFieldStyle}/>
                    </div>
                    <div>
                        <label className='nonSelect'>password</label>
                        <input disabled={loadingState} type='password' name='password' value={password} onChange={handleChange} autoComplete='password' className={passwordFieldStyle}/>
                    </div>
                    <Link to='/forgotpassword' className='registerLink' >Forgot Password?</Link>
                </form>
                <div id='alertMessage' className={alertStyle}>{alertMsg}</div>
                <button disabled={loadingState} onClick={handleSubmit} >Submit</button>
            </div>
            <p>Don't have an account? <Link to='/register' className='registerLink' >Create one.</Link></p>
        </div>
    )
}