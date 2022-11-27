import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import UserList from '../views/UserList';
import UserForm from '../views/UserForm';
import UserEdit from '../views/UserEdit';

export const Router = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/form' element={<UserForm />} />
            <Route path='/users/edit/:id' element={<UserEdit />} />
        </Routes>
    );
};
