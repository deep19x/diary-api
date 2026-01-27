require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const dbConnect = require('./config/db');
const authRoutes = require('./routes/auth');
const diaryRoutes = require('./routes/diary');

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/diary',diaryRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
});