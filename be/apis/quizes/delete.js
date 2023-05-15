import express from 'express';
import {QuizesSchema} from "../../db/connections.js";
const DeleteQuizRouter = express.Router();

DeleteQuizRouter.post('/delete-quiz', async function (req, res) {
  console.log("delete");
  const {quiz_id} = req.body;
  try{

    if (quiz_id) {
        await QuizesSchema
          .deleteOne({ _id: quiz_id })
          
        .then((result) => {
          if (result)
            res.status(200).send({
              message: "Delete successfully",
              data: result
            });
          else res.status(400).send({"message": `No data found at ${quiz_id}`})
        })
        .catch((err) => {
           res.status(400).send({
            message: "Delete failed",
            error: err
          });
        })
    } else {
        res.status(400).send("Bad request");
    }
  } catch {
    res.status(400).send({"message": `Bad request`});
  }
})

export {DeleteQuizRouter}

