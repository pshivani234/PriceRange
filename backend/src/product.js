const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/LoginSignupForm")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const productSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    lowprice: {
        type: Number,
        required: true
    },
    highprice: {
        type: Number,
        required: true
    },
    registration_email_sent: {
        type: Boolean,
        default: false
    }
});

const ProductCollection = mongoose.model('ProductCollection', productSchema);

module.exports = ProductCollection;
