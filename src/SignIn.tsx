import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/SignIn.css';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'username') {
            setUsername(value);
        }
    }

    function handleSubmit() : void {
        console.log(username);
        console.log(password);
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Sign In</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input type='text' name='username' value={username} onChange={handleChange} autoComplete='email' />
                    </div>
                    <div>
                        <label className='nonSelect'>password</label>
                        <input type='password' name='password' value={password} onChange={handleChange} autoComplete='password' />
                    </div>
                </form>
                <button onClick={handleSubmit} >Submit</button>
            </div>
            <p>Don't have an account? <Link to='/register' className='registerLink' >Create one.</Link></p>
        </div>
    )
}