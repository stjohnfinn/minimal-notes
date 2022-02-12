import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/SignIn.css';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertClass, setAlertClass] = useState('hidden');
    const [alertMsg, setAlertMsg] = useState('');

    function handleChange(e: any) : void {
        const name : string = e.target.name;
        const value : string = e.target.value;
        if (name === 'password') {
            setPassword(value)
        } else if (name === 'email') {
            setEmail(value);
        }
    }

    function handleSubmit() : void {
        console.log(email);
        console.log(password);

        if (!validateInput(email)) {
            setAlertClass('shown failure');
            setAlertMsg('Incorrect credentials. Double check you input everything correctly.');
        } else {
            setAlertClass('shown success');
            setAlertMsg('Success, signing you in now!');
        }
    }

    function validateInput(email : string) : boolean {
        let x : number = Math.random();
        if (x > 0.5) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='SignIn' >
            <div className='loginForm'>
                <h1>Sign In</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input type='text' name='email' value={email} onChange={handleChange} autoComplete='email' />
                    </div>
                    <div>
                        <label className='nonSelect'>password</label>
                        <input type='password' name='password' value={password} onChange={handleChange} autoComplete='password' />
                    </div>
                    <Link to='/forgotpassword' className='registerLink' >Forgot Password?</Link>
                </form>
                <div id='alertMessage' className={alertClass}>{alertMsg}</div>
                <button onClick={handleSubmit} >Submit</button>
            </div>
            <p>Don't have an account? <Link to='/register' className='registerLink' >Create one.</Link></p>
        </div>
    )
}