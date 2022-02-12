import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setUsername] = useState('');
    const [msgClass, setMsgClass] = useState('hidden');
    const [resetMsg, setResetMsg] = useState('');

    function handleChange(e: any) : void {
        const value : string = e.target.value;
        setUsername(value);
    }

    function handleSubmit() : void {
        console.log(email);

        if (validateInput(email)) {
            setMsgClass('shown success');
            setResetMsg('Success! An email was sent to that address with further instructions.');
        } else {
            setMsgClass('shown failure');
            setResetMsg('Error! Unfortunately, there is no account associated with that address');
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
        <div className='SignIn ForgotPassword' >
            <div className='loginForm'>
                <h1>Reset Password</h1>
                <form>
                    <div>
                        <label className='nonSelect'>email</label>
                        <input type='text' name='email' value={email} onChange={handleChange} autoComplete='email' />
                    </div>
                </form>
                <div className={msgClass} id='resetMessage'>{resetMsg}</div>
                <button onClick={handleSubmit} >Submit</button>
            </div>
            <p>Already have an account? <Link to='/signin' className='registerLink' >Sign In.</Link></p>
        </div>
    )
}