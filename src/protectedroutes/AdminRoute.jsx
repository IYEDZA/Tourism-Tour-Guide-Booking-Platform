import React, { Children, use } from 'react';


import { Navigate } from 'react-router';
import Authcontext from '../context/Authcontext';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = use(Authcontext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={location.pathname} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;