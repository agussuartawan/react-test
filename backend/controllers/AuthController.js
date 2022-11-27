import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email,
            },
        });
        if (!user[0])
            return res.status(404).json({ message: 'Email not registered.' });

        const isMatch = await argon2.verify(
            user[0].password,
            req.body.password
        );
        if (!isMatch)
            return res.status(400).json({ message: 'Wrong password!' });

        const uuid = user[0].uuid;
        const name = user[0].name;
        const email = user[0].email;
        const gender = user[0].gender;
        const accessToken = jwt.sign(
            { uuid, name, email, gender },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15s',
            }
        );
        const refreshToken = jwt.sign(
            { uuid, name, email, gender },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );

        await User.update(
            { refreshToken: refreshToken },
            {
                where: {
                    uuid: uuid,
                },
            }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (error) {
        console.log(error);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await User.findAll({
            where: {
                refreshToken: refreshToken,
            },
        });
        if (!user[0]) return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                const userUuid = user[0].uuid;
                const name = user[0].name;
                const email = user[0].email;
                const gender = user[0].gender;

                const accessToken = jwt.sign(
                    { userUuid, name, email, gender },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15s',
                    }
                );
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.error(error);
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204);

        const user = await User.findAll({
            where: {
                refreshToken: refreshToken,
            },
        });
        if (!user[0]) return res.sendStatus(204);

        const userUuid = user[0].uuid;
        await User.update(
            { refreshToken: null },
            {
                where: {
                    uuid: userUuid,
                },
            }
        );

        res.clearCookie('refreshCookie');
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
    }
};
