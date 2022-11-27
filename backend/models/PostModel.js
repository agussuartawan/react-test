import { Sequelize } from 'sequelize';
import db from '../config/Database';

const { DataTypes } = Sequelize;

const Post = db.define(
    'posts',
    {
        userUuid: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'uuid',
            },
        },
    },
    {
        freezeTableName: true,
    }
);
