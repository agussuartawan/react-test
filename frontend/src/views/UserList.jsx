import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (exc) {
            console.log(exc);
        }
    };

    return (
        <div className='mt-5'>
            <div class='my-2 text-xl'>
                User Lists
                <Link
                    to='/users/form'
                    class='mx-3 text-sm font-semibold text-blue-700'
                >
                    Add User
                </Link>
            </div>
            <div class='hidden overflow-auto rounded-lg shadow md:block'>
                <table class='w-full'>
                    <thead class='border-b-2 border-gray-200 bg-white'>
                        <tr>
                            <th class='w-20 p-3 text-left text-sm font-semibold tracking-wide'>
                                No.
                            </th>
                            <th class='p-3 text-left text-sm font-semibold tracking-wide'>
                                Name
                            </th>
                            <th class='w-24 p-3 text-left text-sm font-semibold tracking-wide'>
                                Email
                            </th>
                            <th class='w-24 p-3 text-left text-sm font-semibold tracking-wide'>
                                Gender
                            </th>
                            <th class='w-32 p-3 text-left text-sm font-semibold tracking-wide'>
                                #
                            </th>
                        </tr>
                    </thead>
                    <tbody class='divide-y divide-gray-100'>
                        {users.map((user, index) => (
                            <tr class='bg-white' key={index}>
                                <td class='whitespace-nowrap p-3 text-sm text-gray-700'>
                                    {index + 1}
                                </td>
                                <td class='whitespace-nowrap p-3 text-sm text-gray-700'>
                                    <Link
                                        to={`/users/edit/${user.id}`}
                                        class='font-bold text-blue-500 hover:underline'
                                    >
                                        {user.name}
                                    </Link>
                                </td>
                                <td class='whitespace-nowrap p-3 text-sm text-gray-700'>
                                    {user.email}
                                </td>
                                <td class='whitespace-nowrap p-3 text-sm text-gray-700'>
                                    <span class='rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800'>
                                        {user.gender}
                                    </span>
                                </td>
                                <td class='whitespace-nowrap p-3 text-sm text-gray-700'>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        class='font-bold text-red-500 hover:underline'
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden'>
                {users.map((user, index) => (
                    <div
                        class='space-y-3 rounded-lg bg-white p-4 shadow'
                        key={index + '-mobile'}
                    >
                        <div class='flex items-center space-x-2 text-sm'>
                            <div class='text-gray-500'>{index + 1}.</div>
                            <div>
                                <Link
                                    to={`/users/edit/${user.id}`}
                                    class='font-bold text-blue-500 hover:underline'
                                >
                                    {user.name}
                                </Link>
                            </div>
                            <div>
                                <span class='rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800'>
                                    {user.gender}
                                </span>
                            </div>
                        </div>
                        <div class='text-sm text-gray-700'>{user.email}</div>
                        <div class='font-medium text-black'>
                            <span
                                onClick={() => deleteUser(user.id)}
                                href='#'
                                class='cursor-pointer text-xs font-bold text-red-500 hover:underline'
                            >
                                delete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
