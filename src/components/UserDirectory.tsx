import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../style/UserDirectory.css';
import { useNavigate } from 'react-router-dom';

export default function UserDirectory() {
    const { currentUser, signOut } = useAuth();
    const [files, setFiles] = useState(null);
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('Undefined');

    useEffect( () => {
        console.log('checking for existing current user');
        if (!currentUser) {
            navigate('/signin');
            console.log('no existing user.');
        } else {
            setUserEmail(currentUser.email);
            console.log('existing user found.');
        }
    });

    async function handleSignOut(e: object): Promise<void> {
        try {
            signOut();
            navigate('/');
        } catch {
            console.error('Failed to log out.');
        }
    }

    return (
        <div className='userDirectory'>
            <div className='userDirectoryContent'>
                <div className='titleBar'>
                    <h1>{userEmail}</h1>
                    <a onClick={handleSignOut}>sign out</a>
                </div>
                <div className='files'>
                    <div className='create'>
                        {files}
                        <a><img src='/images/create.svg' /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}