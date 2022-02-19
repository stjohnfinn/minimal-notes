import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../style/UserDirectory.css';
import { useNavigate } from 'react-router-dom';

export default function UserDirectory() {
    const { currentUser, signOut } = useAuth();
    const [files, setFiles] = useState<any[]>([(<h1 key={1}>something</h1>)]);
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('Undefined');

    const ATLAS_DB_URI = process.env.REACT_APP_ATLAS_DB_URI;

    useEffect( () => {
        console.log('checking for existing current user');
        if (!currentUser) {
            navigate('/signin');
            console.log('no existing user.');
        } else {
            setUserEmail(currentUser.email);
            console.log('existing user found.');
        }

        retrieveDocuments();
    }, [currentUser, navigate]);

    async function retrieveDocuments() {
        setFiles([
            (
                <div className='loader-docs' key={0}>
                    <div></div>
                </div>
            )
        ]);

        return await fetch(ATLAS_DB_URI + '/documents/findByEmail/' + encodeURI(currentUser.email), {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => loadFilesIntoState(data))
            .catch(err => console.log(err));
    }

    function loadFilesIntoState(docs: any): void {
        console.log(docs);
        let fileArray = [];
        for (let i = 0; i < docs.length; i++) {
            const file = docs[i];
            const lastUpdated = new Date(Date.parse(file.updatedAt)).toDateString();
            let fileComponent = (
                <div className='file' key={i}>
                    <div className='fileInfo'>
                        <h1>{file.title}</h1>
                        <p>Edited: {lastUpdated}</p>
                    </div>
                    <div className='fileOperations'>
                        <a><img src='/images/delete.svg' alt='delete' /></a>
                        <a><img src='/images/edit.svg' alt='remove' /></a>
                    </div>
                </div>
            );
            fileArray.push(fileComponent);
        }
        setFiles(fileArray);
    }

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
                    {files}
                    <div className='create'>
                        <a><img src='/images/create.svg' alt='create' /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}