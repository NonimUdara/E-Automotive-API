const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postal:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    amount: {
        type:String
    },
    card: {
        type:String
    },
    
});

module.exports = mongoose.model('Checkouts',postSchema);