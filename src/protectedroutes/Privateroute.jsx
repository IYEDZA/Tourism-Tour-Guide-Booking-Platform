import React, { use } from 'react';
import Authcontext from '../context/Authcontext';
import { Navigate, useLocation } from 'react-router';

const Privateroute = ({children}) => {
  const {user, loading}= use(Authcontext)
  const location =useLocation()
   if(loading){
        return <span className="loading loading-spinner text-primary"></span>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children
};

export default Privateroute;