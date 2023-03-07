require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./controllers/admincontroller");


const app = express();

//app middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//route middleware
app.use("/api/users", userRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://Udara:udara123@mernapp.ypcrk.mongodb.net/e-automotive?retryWrites=true&w=majority'

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log('DB Connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});