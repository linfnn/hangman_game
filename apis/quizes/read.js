

import express from 'express';
import {QuizesSchema} from "../../db/connections.js";
const ReadQuizRouter = express.Router();

ReadQuizRouter.get('/read-quiz', async function (req, res) {
  const {type} = req.query;
    if (type) {
       await QuizesSchema.find({
            type: type
       }).then((result) => {

          res.status(200).send({
            message: "Read successfully",
            data: result
          });
        })
        .catch((err) => {
           res.status(400).send({
            message: "Read failed",
            error: err
          });
        })
    } else {
        res.status(400).send("Bad request");
    }
})

export {ReadQuizRouter}

