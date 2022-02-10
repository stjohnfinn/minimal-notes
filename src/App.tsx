import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import SignIn from './SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar />
                <Routes >
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;