import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loadingState, setLoadingState] = useState(true);

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoadingState(false);
        });

        return unsubscribe;
    }, []);

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function signOut() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        register,
        signIn,
        signOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loadingState && children}
        </AuthContext.Provider>
    )
}
