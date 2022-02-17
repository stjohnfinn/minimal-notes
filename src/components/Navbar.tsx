import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { currentUser } = useAuth();

    return (
        <div className='Navbar'>
            <h1 className='nonSelect' >minimemo</h1>
            <div>
                <Link to='/' className='navLink bracketButton' >Home</Link>
                <Link to={currentUser ? '/directory' : '/signin'} className='navLink bracketButton' >{currentUser ? "Directory" : "Sign In / Register"}</Link>
            </div>
        </div>
    )
}