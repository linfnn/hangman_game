// Requiring module
import express from 'express';
import cors from 'cors'
import  bodyParser from 'body-parser';

import { ReadQuizRouter } from './apis/quizes/read.js';
import {CreateQuizRouter } from './apis/quizes/create.js';
import { GetQuizRouter, UpdateQuizRouter } from './apis/quizes/update.js';
import { DeleteQuizRouter } from './apis/quizes/delete.js';
// Creating express object
const app = express();
 
// Defining port number
const PORT = 3000;
 
// Function to serve all static files
// inside public directory.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads",express.static('uploads'));
app.use("/",ReadQuizRouter);
app.use("/", CreateQuizRouter);
app.use("/", GetQuizRouter);
app.use("/", UpdateQuizRouter);
app.use("/",DeleteQuizRouter);
 
// Server setup
app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}...`);
})
