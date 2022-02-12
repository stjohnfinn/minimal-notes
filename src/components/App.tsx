import React from 'react';
// @ts-ignore;
import Navbar from './Navbar';
// @ts-ignore;
import Home from './Home';
// @ts-ignore;
import SignIn from './SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// @ts-ignore;
import Register from './Register';
// @ts-ignore;
import ForgotPassword from './ForgotPassword';
// @ts-ignore;
import CreateNewPassword from './CreateNewPassword';

function App() {

    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar />
                <Routes >
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/createpassword' element={<CreateNewPassword />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;