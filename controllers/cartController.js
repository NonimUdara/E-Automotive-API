const express = require('express');
const Posts = require('../models/cart');

const router = express.Router();

//save part

router.post('/cart/save',(req,res)=>{

    let newPost = new Posts(req.body);

    console.log("req",req.body);
    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });
});

// get all parts

router.get('/cart',(req,res) =>{
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

//get a specific part

router.get("/cart/:userId",(req,res) =>{
    console.log("postId dddddddd");
    let postId = req.params.userId;
    console.log("postId", postId);

    Posts.findById(postId,(err,post) =>{
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            post: post
        });
    });
});

//update part details

router.put('/cart/update/:userId',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.userId,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

//delete part

router.delete('/cart/delete/:id',(req,res) =>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
        
        if(err) return res.status(400).json({
            message:"Delete Unsuccessfull",err
        });

        return res.json({
            message:"Delete Successfull",deletedPost
        });
    });
});

module.exports = router;