const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(dbUrl, dbOptions)
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  })

module.exports = mongoose;