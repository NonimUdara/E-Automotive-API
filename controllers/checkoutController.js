const express = require('express');
const Posts = require('../models/checkout');

const router = express.Router();

//save checkout

router.post('/payment/save',(req,res)=>{

    let newPost = new Posts(req.body);
    //console.log("Checkout Save: ", req.body);
    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Payment saved successfully"
        });
    });
});

// get all checkouts

router.get('/payments',(req,res) =>{
    Posts.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

module.exports = router;