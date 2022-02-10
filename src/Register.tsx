import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'username') {
            setUsername(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    function handleSubmit() : void {
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Register</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input type='text' name='username' value={username} onChange={handleChange} autoComplete='email' />
                    </div>
                    <div>
                        <label className='nonSelect'>password</label>
                        <input type='password' name='password' value={password} onChange={handleChange} autoComplete='password' />
                    </div>
                    <div>
                        <label className='nonSelect'>confirm password</label>
                        <input type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} autoComplete='off' />
                    </div>
                </form>
                <button onClick={handleSubmit} >Submit</button>
            </div>
            <p>Already have an account? <Link to='/signin' className='registerLink' >Create one.</Link></p>
        </div>
    )
}