import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element: Element, adminRoute, ...rest }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (adminRoute && user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return <Element {...rest} />;
};
export default PrivateRoute
