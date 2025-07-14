import React from 'react';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';

const Rootlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div className='mt-10'>
                <Footer></Footer>
            </div>
            
        </div>
    );
};

export default Rootlayout;