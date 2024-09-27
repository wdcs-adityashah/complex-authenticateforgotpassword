import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config()
import { UserRoute } from './routes/user.js';
const app = express();
mongoose.connect('mongodb://localhost:27017/authentication')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth',UserRoute);

app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
})