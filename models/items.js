const imageSchema = require('./image');
const mongoose = require('mongoose');

const items = mongoose.Schema({
    productId:{
        type:String,
    },
    productTitle:{
        type:String,
    },
    productPrice:{
        type:Number,
    },
    quantity: {
        type:Number,
    },
    sum: {
        type: Number,
    },
    image: {
        type: String,
    }

});

module.exports = items;