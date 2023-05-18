const express = require('express');
const Posts = require('../models/garage');
const router = express.Router();
const nodeMailer = require('nodemailer');

//save part

router.post('/garage/save', (req, res) => {

    let newPost = new Posts(req.body);

    newPost.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Posts saved successfully"
        });
    });
});

// get all users

router.get('/garages', (req, res) => {
    Posts.find().exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingGarages: posts
        });
    });
});

//get a specific user

router.get("/garage/:id", (req, res) => {

    let postId = req.params.id;

    Posts.findById(postId, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            post
        });
    });
});

//update user

router.put('/garage/updateAT/:id', (req, res) => {
    console.log(req.body.email);
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            const html =
                `<h1>Congratulations!</h1>
			     <h4>Your Garage Succeffsully Added to the System.</h4>`
                ;

            //console.log(email);

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nonimudara234@gmail.com',
                    pass: 'mbrzcvaxduurhwrn'
                }
            });

            const info = transporter.sendMail({
                from: 'nonimudara234@gmail.com',
                to: req.body.email,
                subject: 'Your Garage Added Successfully!',
                html: html,
            })

            return res.status(200).json({

                success: "Updated Successfully",

            });
        }
    );
});

//update user

router.put('/garage/updateAF/:id', (req, res) => {
    console.log(req.body.email);
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            const html =
                `<h1>Sorry!</h1>
			     <h4>Your Garage Can't Added to the System.</h4>
                 <h4>Please Give More Details.</h4>`
                ;

            //console.log(email);

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nonimudara234@gmail.com',
                    pass: 'mbrzcvaxduurhwrn'
                }
            });

            const info = transporter.sendMail({
                from: 'nonimudara234@gmail.com',
                to: req.body.email,
                subject: 'Access Denied!',
                html: html,
            })

            return res.status(200).json({

                success: "Updated Successfully",

            });
        }
    );
});

//update user

router.put('/garage/update/:id', (req, res) => {
    //console.log(req.body.email);
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully",

            });
        }
    );
});

//delete user

router.delete('/garage/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {

        if (err) return res.status(400).json({
            message: "Delete Unsuccessfull", err
        });

        return res.json({
            message: "Delete Successfull", deletedPost
        });
    });
});

module.exports = router;