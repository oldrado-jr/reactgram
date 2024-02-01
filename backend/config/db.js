const mongoose = require('mongoose');

const conn = async () => {
  try {
    const uri = process.env.DB_URI || '';
    await mongoose.connect(uri);
    console.log('Conectou ao banco!');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

conn();

module.exports = conn;
