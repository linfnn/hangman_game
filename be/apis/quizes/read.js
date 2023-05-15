

import express from 'express';
import {QuizesSchema} from "../../db/connections.js";
const ReadQuizRouter = express.Router();

ReadQuizRouter.get('/read-quiz', async function (req, res) {
  console.log("read");
  const {type, limit = 5, page = 1} = req.query;
  try{

    if (type) {
        await QuizesSchema
          .find( { type: type} )
          .skip((page-1)*limit)
          // .sort( { _id: -1 } )
          .limit(limit)
        .then((result) => {
          if (result)
            res.status(200).send({
              message: "Read successfully",
              data: result
            });
          else res.status(400).send({"message": "No data"})
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
  } catch {
    await QuizesSchema
      .find()
      .skip(page*limit)
      // .sort( { _id: -1 } )
      .limit(limit)
    .then((result) => {
    if (result)
      res.status(200).send({
        message: "Read successfully",
        data: result
      });
    else res.status(400).send({"message": "No data"})
  })
  }
})

export {ReadQuizRouter}

