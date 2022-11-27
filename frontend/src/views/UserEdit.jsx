import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        gender,
      });
      navigate('/users');
    } catch (exc) {
      console.log(exc);
    }
  };

  const getUserById = async () => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    setName(res.data.name);
    setEmail(res.data.email);
    setGender(res.data.gender);
  };

  return (
    <div className='flex justify-center'>
      <div className='overflow-auto rounded-lg shadow p-6 bg-white w-96 block'>
        <form onSubmit={saveUser}>
          <div className='form-group mb-6'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control block
                                                w-full
                                                px-3
                                                py-1.5
                                                text-base
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInput7'
              placeholder='Name'
            />
          </div>
          <div className='form-group mb-6'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='form-control block
                                                w-full
                                                px-3
                                                py-1.5
                                                text-base
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInput8'
              placeholder='Email address'
            />
          </div>
          <div className='form-group mb-6'>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='form-control block
                                                w-full
                                                px-3
                                                py-1.5
                                                text-base
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              id='exampleInput8'
              placeholder='Email address'
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <button
            type='submit'
            className='
                                        w-full
                                        px-6
                                        py-2.5
                                        bg-blue-600
                                        text-white
                                        font-medium
                                        text-xs
                                        leading-tight
                                        uppercase
                                        rounded
                                        shadow-md
                                        hover:bg-blue-700 hover:shadow-lg
                                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                        active:bg-blue-800 active:shadow-lg
                                        transition
                                        duration-150
                                        ease-in-out'
          >
            Save
          </button>

          <button
            className='
                                        w-full
                                        px-6
                                        py-2.5
                                        bg-red-600
                                        text-white
                                        font-medium
                                        text-xs
                                        leading-tight
                                        uppercase
                                        rounded
                                        shadow-md
                                        hover:bg-red-700 hover:shadow-lg
                                        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                                        active:bg-red-800 active:shadow-lg
                                        transition
                                        duration-150
                                        ease-in-out
                                        my-2'
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
