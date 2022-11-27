import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'gender'],
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'gender'],
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createUser = async (req, res) => {
    const { name, email, gender, password, confPassword } = req.body;
    if (password !== confPassword)
        return res
            .status(400)
            .json({ message: 'Password and Confirm Password doesn`t match' });
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            gender: gender,
            password: hashPassword,
        });
        res.status(201).json({ message: 'User created successfuly.' });
    } catch (error) {
        console.error(error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: 'User updated successfuly.' });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: 'User delete successfuly.' });
    } catch (error) {
        console.log(error.message);
    }
};
