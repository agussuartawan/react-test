import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_ROOT}/api/login`, {
                email,
                password,
            });
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center'>
            <div className='flex w-96 flex-col items-center rounded-md bg-white p-5 drop-shadow-md'>
                {message !== '' && (
                    <div role='alert' className='mb-5 w-full'>
                        <div class='rounded-t bg-red-500 px-4 py-2 font-bold text-white'>
                            Error
                        </div>
                        <div class='rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700'>
                            <p>{message}</p>
                        </div>
                    </div>
                )}
                <h1 class='mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                    Sign in to your account
                </h1>
                <form className='w-full max-w-xs' onSubmit={auth}>
                    <div className='mb-4'>
                        <label
                            htmlFor='email'
                            className='text=sm mb-2 block font-bold text-gray-700'
                        >
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                            placeholder='Email'
                            className='leading tight w-full appearance-none rounded border py-2 px-3 text-gray-700 shadow focus:outline-blue-300'
                        />
                    </div>

                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='text=sm mb-2 block font-bold text-gray-700'
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type='password'
                            placeholder='********'
                            className='leading tight w-full appearance-none rounded border py-2 px-3 text-gray-700 shadow focus:outline-blue-300'
                        />
                    </div>

                    <div class='flex items-center justify-between'>
                        <button
                            class='focus:shadow-outline w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
