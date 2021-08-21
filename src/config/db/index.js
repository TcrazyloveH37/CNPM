const mongoose = require('mongoose');

//'mongodb://localhost:27017/CNPM_dev'
const url =
  'mongodb+srv://huyne:TcrazyloveH37@cluster0.usrm7.mongodb.net/CNPM?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
    console.log(error);
  }
}

module.exports = { connect };
