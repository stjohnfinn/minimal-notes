import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/ForgotPassword.css';
import { validateEmail } from '../validateUserCredentials.mjs';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    const [email, setUsername] = useState('');
    const [alertStyle, setAlertStyle] = useState('hidden');
    const [alertMsg, setAlertMsg] = useState('');
    const { resetPassword } = useAuth(); 

    function handleChange(e: any) : void {
        const value : string = e.target.value;
        setUsername(value);
    }

    async function handleSubmit() : Promise<void> {
        console.log(email);

        if (!validateEmail(email)) {
            setAlertStyle('shown failure');
            setAlertMsg('Error! Unfortunately, there is no account associated with that address');
        }

        try {
            await resetPassword(email);
            setAlertStyle('shown success');
            setAlertMsg('Success! Check your inbox for further instructions.');
        } catch {
            setAlertStyle('shown failure');
            setAlertMsg('Error! Unfortunately, there is no account associated with that address');
            return;
        }
    }

    return (
        <div className='SignIn ForgotPassword' >
            <div className='loginForm'>
                <h1>Reset Password</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input type='text' name='email' value={email} onChange={handleChange} autoComplete='email' />
                    </div>
                </form>
                <div className={alertStyle} id='alertMessage'>{alertMsg}</div>
                <button onClick={handleSubmit} >Submit</button>
            </div>
            <p>Clicked on accident? <Link to='/signin' className='registerLink' >Sign In.</Link></p>
        </div>
    )
}