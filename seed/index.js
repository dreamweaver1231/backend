const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { addProducts } = require('./products');
const { addCategories } = require('./category');
const { addCollections } = require('./collection');
const { addBrands } = require('./brand');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

mongoose.connection.on('connected', async () => {
  console.log('%s MongoDB connection sucess.', chalk.green('✓'));

  await addProducts();
  await addCategories();
  await addCollections();
  await addBrands();
  process.exit();
});
