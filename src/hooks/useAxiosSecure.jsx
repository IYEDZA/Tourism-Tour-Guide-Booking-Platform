import axios from 'axios';
import React, { use } from 'react';

import { useNavigate } from 'react-router';
import Authcontext from '../context/Authcontext';

const axiosSecure = axios.create({
    baseURL: `https://my-as-12-tourist-server.vercel.app`
});

const useAxiosSecure = () => {
    const { user, logOut } = use(Authcontext);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
         const token = localStorage.getItem('access-token')
        // user.accessToken
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            // navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    // navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;