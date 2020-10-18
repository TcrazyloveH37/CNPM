const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, default: 'Vui Long Nhap Ten San Pham' },
  description: { type: String, default: 'Mo Ta San Pham' },
  image: {
    type: String,
    default:
      'https://www.1012industryreport.com/wp-content/uploads/2019/09/Questions.jpg',
  },
  price: { type: Number, default: 5000 },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Product', Product);
