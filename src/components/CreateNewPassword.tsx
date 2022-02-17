import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validatePassword } from '../validateUserCredentials.mjs';

export default function CreateNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertStyle, setAlertStyle] = useState('hidden');

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    function handleSubmit() : void {
        console.log(password);
        console.log(confirmPassword);

        if (confirmPassword !== password) {
            setAlertStyle('shown failure');
            setAlertMsg('Passwords do not match.');
            return;
        } if (!validatePassword(password)) {
            setAlertStyle('shown failure');
            setAlertMsg('Invalid password. Double check you input everything correctly. Passwords must be 8-16 characters ' +
            'long, include at least one special character (~!@#$$%^&*-+=+[]{};:,.?), and have at least five unique ' +
            'characters. ' );
            return;
        }

        try {
        } catch {
            setAlertStyle('shown failure');
            setAlertMsg('Error! Unfortunately, there is no account associated with that address');
            return;
        }
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Reset Password</h1>
                <form>
                    <div>
                        <label className='nonSelect'>new password</label>
                        <input type='password' name='password' value={password} onChange={handleChange} autoComplete='password' />
                    </div>
                    <div>
                        <label className='nonSelect'>confirm new password</label>
                        <input type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} autoComplete='off' />
                    </div>
                </form>
                <div className={alertStyle} id='alertMessage'>{alertMsg}</div>
                <button onClick={handleSubmit} >Submit</button>
                <p>Clicked on accident? <Link to='/signin' className='registerLink' >Sign In.</Link></p>
            </div>
        </div>
    )
}