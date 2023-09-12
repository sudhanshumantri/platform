import { Sequelize } from 'sequelize';

// Replace with your database configuration
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'oracle', // Use the appropriate database dialect
});

export { sequelize };