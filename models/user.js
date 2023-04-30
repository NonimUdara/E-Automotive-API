const imageSchema = require('./image');

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    address: {
        type:String
    },
    postalcode: {
        type:String
    },
    
});

module.exports = mongoose.model('Members',postSchema);