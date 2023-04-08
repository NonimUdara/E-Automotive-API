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
        type:imageSchema,
    }

});

module.exports = mongoose.model('Members',postSchema);