const imageSchema = require('./image');

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    image: {
        type:imageSchema,
    },
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    condition: {
        type:String,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    ownerId: {
        type: String,
    }
});

module.exports = mongoose.model('Parts',postSchema);