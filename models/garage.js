const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    image1: {
        type:String,

    },
    image2: {
        type:String,

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
    number: {
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

    },
});

module.exports = mongoose.model('Garage',postSchema);