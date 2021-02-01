const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try
  {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser
      }
    });
    await Product.insertMany(sampleProducts);
    console.log('Data imported'.green.inverse);
  } catch (error)
  {
    console.error(`Error occur when insert data ${error.message}`.red.bold);
    process.exit(1);
  }
}

const destroyData = async () => {
  try
  {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Data destroyed'.red.bold);
    process.exit();
  } catch (error)
  {
    console.error(`Error occur when destroy data ${error.message}`.red.bold);
    process.exit(1);
  }
}

if (process.argv[2] === '-d')
{
  destroyData();
} else
{
  importData();
}