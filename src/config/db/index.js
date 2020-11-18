const mongoose = require('mongoose');

const url = 'mongodb+srv://HUY:234700@huy.kkg43.mongodb.net/CNPM_dev';
//'mongodb://localhost:27017/CNPM_dev'
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}

module.exports = { connect };
