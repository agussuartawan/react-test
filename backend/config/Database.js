import { Sequelize } from 'sequelize';

const db = new Sequelize('react_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
