import express from 'express';
import cors from 'cors';
import {connect}  from './configdb';
import {userRoute} from './routes/userRoute'
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/auth', userRoute);
connect();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is lived on ${process.env.PORT}`)
})