import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;