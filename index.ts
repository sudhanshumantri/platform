var express = require('express');
import { sequelize } from './src/config/sequelize';
import {ExpressLoader} from './src/loaders/index';

async function main() {
    try {
     await sequelize.authenticate();
      console.log('Connected to the database');
      // Add your application logic here
     await sequelize.sync(); // Synchronize the database schema with the models
      new ExpressLoader();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  main();
