import React from 'react';
import Header from '../components/Header';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className='px-2 min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;
