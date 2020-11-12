const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Account = new Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Phạm Đức Huy', required: true },
    image: {
        type: String,
        default:
            'https://www.1012industryreport.com/wp-content/uploads/2019/09/Questions.jpg'
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    slug: { type: String, slug: "id", unique: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', Account);
