const mongoose = require('mongoose');

const connectDB = async () => {
  try
  {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`MongoDB connected ${connect.connection.host}`.cyan.underline);
  } catch (error)
  {
    console.error(`Error occur ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}

module.exports = connectDB;