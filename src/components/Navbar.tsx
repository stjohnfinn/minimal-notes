import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

export default function Navbar() {

    return (
        <div className='Navbar'>
            <h1 className='nonSelect' >minimemo</h1>
            <div>
                <Link to='/' className='navLink bracketButton' >Home</Link>
                <Link to='/signin' className='navLink bracketButton' >Sign In / Register</Link>
            </div>
        </div>
    )
}