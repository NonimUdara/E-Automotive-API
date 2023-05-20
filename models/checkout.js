const moment = require('moment-timezone');
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
    createdAt: {
        type: Date,
        default: () => moment().tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss')
   }
    
});

module.exports = mongoose.model('Checkouts',postSchema);