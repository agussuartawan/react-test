import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                gender,
            });
            navigate('/users');
        } catch (exc) {
            console.log(exc);
        }
    };

    return (
        <div className='flex justify-center'>
            <div class='block w-96 overflow-auto rounded-lg bg-white p-6 shadow'>
                <form onSubmit={saveUser}>
                    <div class='form-group mb-6'>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            class='form-control m-0
                                                block
                                                w-full
                                                rounded
                                                border
                                                border-solid
                                                border-gray-300
                                                bg-white bg-clip-padding
                                                px-3 py-1.5 text-base
                                                font-normal
                                                text-gray-700
                                                transition
                                                ease-in-out
                                                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                            id='exampleInput7'
                            placeholder='Name'
                        />
                    </div>
                    <div class='form-group mb-6'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            class='form-control m-0
                                                block
                                                w-full
                                                rounded
                                                border
                                                border-solid
                                                border-gray-300
                                                bg-white bg-clip-padding
                                                px-3 py-1.5 text-base
                                                font-normal
                                                text-gray-700
                                                transition
                                                ease-in-out
                                                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                            id='exampleInput8'
                            placeholder='Email address'
                        />
                    </div>
                    <div class='form-group mb-6'>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            class='form-control m-0
                                                block
                                                w-full
                                                rounded
                                                border
                                                border-solid
                                                border-gray-300
                                                bg-white bg-clip-padding
                                                px-3 py-1.5 text-base
                                                font-normal
                                                text-gray-700
                                                transition
                                                ease-in-out
                                                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                            id='exampleInput8'
                            placeholder='Email address'
                        >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        class='
                                        mb-3
                                        w-full
                                        rounded
                                        bg-blue-600
                                        px-6
                                        py-2.5
                                        text-xs
                                        font-medium
                                        uppercase
                                        leading-tight
                                        text-white
                                        shadow-md
                                        transition duration-150
                                        ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                        focus:shadow-lg focus:outline-none
                                        focus:ring-0
                                        active:bg-blue-800
                                        active:shadow-lg'
                    >
                        Save
                    </button>

                    <Link
                        to='/users'
                        class='
                                        my-2
                                        w-full
                                        rounded
                                        bg-red-600
                                        px-6
                                        py-2.5
                                        text-xs
                                        font-medium
                                        uppercase
                                        leading-tight
                                        text-white shadow-md
                                        transition duration-150 ease-in-out hover:bg-red-700
                                        hover:shadow-lg focus:bg-red-700
                                        focus:shadow-lg
                                        focus:outline-none
                                        focus:ring-0
                                        active:bg-red-800
                                        active:shadow-lg'
                    >
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
