const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    image1: {
        type:String,
        required:true
    },
    image2: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    town:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    latitude: {
        type: String,
        required:true
    },
    longitude: {
        type: String,
        required:true
    },
    access: {
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Garage',postSchema);