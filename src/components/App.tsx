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
import { AuthProvider } from '../contexts/AuthContext';
import UserDirectory from './UserDirectory';
import Editor from './Editor';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <div className='App'>
                    <Navbar />
                    <Routes >
                        <Route path='/' element={<Home />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgotpassword' element={<ForgotPassword />} />
                        <Route path='/directory' element={<UserDirectory />} />
                        <Route path='/editor' element={<Editor />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;