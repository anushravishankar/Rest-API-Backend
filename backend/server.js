const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errormiddleware')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//DB
connectDB()

//Routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

//Server set-up
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})