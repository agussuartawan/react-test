import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ROOT}/api/token`
            );

            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav class='mb-5 flex w-full flex-col rounded-lg bg-white py-4 px-6 text-center font-sans shadow sm:flex-row sm:items-baseline sm:justify-between sm:text-left'>
            <div class='mb-2 sm:mb-0'>
                <a
                    href='/home'
                    class='text-grey-darkest hover:text-blue-dark text-2xl no-underline'
                >
                    React Test
                </a>
                <span>{name}</span>
            </div>
            <div>
                <Link
                    to='/users'
                    class='text-grey-darkest hover:text-blue-dark ml-2 text-lg no-underline'
                >
                    Users
                </Link>
                <a
                    to='/posts'
                    class='text-grey-darkest hover:text-blue-dark ml-2 text-lg no-underline'
                >
                    Posts
                </a>
                <a
                    href='/three'
                    class='text-grey-darkest hover:text-blue-dark ml-2 text-lg no-underline'
                >
                    Logout
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
