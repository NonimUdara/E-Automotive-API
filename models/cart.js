const mongoose = require('mongoose');
const itemsSchema = require('./items');

const postSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
    },
    items: [itemsSchema],
    userId: {
        type: String,
    }
});

module.exports = mongoose.model('Cart',postSchema);