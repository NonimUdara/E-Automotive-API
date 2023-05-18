const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

mongoose.set('strictQuery', false);

const authRoutes = require("./controllers/adminLoginController");
const userAuthRoutes = require("./controllers/userRegisterController");
const loginRoutes = require("./controllers/userLoginController");

const userRoutes = require('./controllers/userController');
const partsRoutes = require('./controllers/partsController');
const cartRoutes = require('./controllers/cartController');
const paymentRoutes = require('./controllers/paymentController');
const garageRoutes = require('./controllers/garageController');
const checkoutRoutes = require('./controllers/checkoutController');
const contactUsRoutes = require('./controllers/contactUsController');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//app middleware
app.use(bodyParser.json());//increase the limit
app.use(cors());
app.use(express.json());


//route middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userAuthRoutes);
app.use("/api/memberlog", loginRoutes);

app.use(userRoutes);
app.use(partsRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);
app.use(garageRoutes);
app.use(checkoutRoutes);
app.use(contactUsRoutes);

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