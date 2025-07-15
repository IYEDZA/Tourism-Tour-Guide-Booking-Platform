import React, { use } from 'react';
import useUserRole from '../hooks/useUserRole';
import Authcontext from '../context/Authcontext';

const TourGuideRoute = ({children}) => {
     const { user, loading } = use(Authcontext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'tourGuide') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default TourGuideRoute;