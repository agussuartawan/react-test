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
    <div>
      <Link
        to='/form'
        class='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'
      >
        Add User
      </Link>
      <h1 class='text-xl my-2'>User Lists</h1>
      <div class='overflow-auto rounded-lg shadow hidden md:block'>
        <table class='w-full'>
          <thead class='bg-gray-50 border-b-2 border-gray-200'>
            <tr>
              <th class='w-20 p-3 text-sm font-semibold tracking-wide text-left'>
                No.
              </th>
              <th class='p-3 text-sm font-semibold tracking-wide text-left'>
                Name
              </th>
              <th class='w-24 p-3 text-sm font-semibold tracking-wide text-left'>
                Email
              </th>
              <th class='w-24 p-3 text-sm font-semibold tracking-wide text-left'>
                Gender
              </th>
              <th class='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                #
              </th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-100'>
            {users.map((user, index) => (
              <tr class='bg-white' key={index}>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  {index + 1}
                </td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <Link
                    to={`/edit/${user.id}`}
                    class='font-bold text-blue-500 hover:underline'
                  >
                    {user.name}
                  </Link>
                </td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  {user.email}
                </td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span class='p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50'>
                    {user.gender}
                  </span>
                </td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>
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

      <div class='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>
        {users.map((user, index) => (
          <div
            class='bg-white space-y-3 p-4 rounded-lg shadow'
            key={index + '-mobile'}
          >
            <div class='flex items-center space-x-2 text-sm'>
              <div class='text-gray-500'>{index + 1}.</div>
              <div>
                <Link
                  to={`/edit/${user.id}`}
                  class='text-blue-500 font-bold hover:underline'
                >
                  {user.name}
                </Link>
              </div>
              <div>
                <span class='p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50'>
                  {user.gender}
                </span>
              </div>
            </div>
            <div class='text-sm text-gray-700'>{user.email}</div>
            <div class='font-medium text-black'>
              <span
                onClick={() => deleteUser(user.id)}
                href='#'
                class='cursor-pointer font-bold text-xs text-red-500 hover:underline'
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
