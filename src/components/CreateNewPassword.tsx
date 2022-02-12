import React, { useState } from 'react';

export default function CreateNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                <button onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}