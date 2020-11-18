const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
mongoose.plugin(slug);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Product = new Schema({
  name: { type: String, default: 'Vui Long Nhap Ten San Pham', required: true },
  description: { type: String, default: 'Mo Ta San Pham', required: true },
  image: {
    type: String,
    default:
      'https://www.1012industryreport.com/wp-content/uploads/2019/09/Questions.jpg',
    // required: true
  },
  price: { type: Number, default: 5000, required: true },
  slug: { type: String, slug: "name", unique: true },
}, {
  timestamps: true
});

// add plugin after define schema
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: ['find', 'countDocuments'] });

module.exports = mongoose.model('Product', Product);
