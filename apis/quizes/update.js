
import express from 'express';
import {QuizesSchema} from "../../db/connections.js";
import path from 'path'
import multer from 'multer';
import { removeUploadFile } from '../../utils/removeFile.js';



const GetQuizRouter = express.Router();
const UpdateQuizRouter = express.Router();

const uploadFolder = "uploads/images/"

// config file upload with destination at /uploads direction
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|pdf/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Please upload valid file");
  },
});
// -------------------------------------------

GetQuizRouter.get('/get-quiz', async function (req, res) {
  console.log("get");
  const {id} = req.query
  // console.log({img: req.file, name, type, hint});

    if (id){
      
      await QuizesSchema.findOne({_id: id})
        .then((result) => {

          res.status(200).send({
            message: "Get successfully",
            data: result
          });
        })
        .catch((err) => {
           res.status(400).send({
            message: "Get failed",
            error: err
          });
        })
    } else {
      res.status(400).send("Bad request");
    } 

})

UpdateQuizRouter.post('/update-quiz', upload.single('img_url'), async function (req, res) {
  const {id, name, type, hint} = req.body;
  const {path} = req.file ?? {path: null};
  console.log("update");
  // console.log({img: req.file, name, type, hint});

    if (name && req.file && type){
      const query = {
          name: name,
          imageUrl: path,
          hint: hint,
          type: type
      }
      const prevUrl = await QuizesSchema.findOne({_id: id}).then(res => res.imageUrl);
      await QuizesSchema.findOneAndUpdate({_id: id}, query)
        .then((result) => {
          removeUploadFile(prevUrl);
          res.status(200).send({
            message: "Update successfully",
            data: result
          });
        })
        .catch((err) => {
          console.log( "Update failed");
           res.status(400).send({
            message: "Update failed",
            error: err
          });
        })
    } else {
      res.status(400).send("Bad request");
    } 

})

export {GetQuizRouter, UpdateQuizRouter};

