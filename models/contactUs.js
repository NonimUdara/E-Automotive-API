const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    type:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('ContactUs',postSchema);