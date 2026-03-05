import React from 'react';
// import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <div className="h-screen flex items-center justify-center font-bold text-xl animate-pulse">
        loading
        </div>; 
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;