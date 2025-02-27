const express = require('express');
const Posts = require('../models/contactUs');
const router = express.Router();

//save contactus message

router.post('/contactus/save', (req, res) => {
    let newPost = new Posts(req.body);

    newPost.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Contactus Message saved successfully"
        });
    });
});

// get all contactus messages

router.get('/contactus', (req, res) => {
    Posts.find().exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});

module.exports = router;