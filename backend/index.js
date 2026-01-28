require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dbConnect = require('./config/db');
const authRoutes = require('./routes/auth');
const diaryRoutes = require('./routes/diary');

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use('/api/auth',authRoutes);
app.use('/api/diary',diaryRoutes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
});