import React, { use } from 'react';
import Authcontext from '../context/Authcontext';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const TouristRoute = ({children}) => {
    const { user, loading } = use(Authcontext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'tourist') {
        return <Navigate state={location.pathname} to="/forbidden"></Navigate>
    }

    return children;
};

export default TouristRoute;