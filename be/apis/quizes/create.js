
import express from 'express';
import {QuizesSchema} from "../../db/connections.js";
import path from 'path'
import multer from 'multer';

const CreateQuizRouter = express.Router();

const uploadFolder = "be/uploads/images/"

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

CreateQuizRouter.post('/create-quiz', upload.single('img_url'), async function (req, res) {
  console.log("create");
  const {name, type, hint} = req.body;
  const {path} = req.file ?? {path: null};
  // console.log({img: req.file, name, type, hint});

    if (name && req.file && type){
      const query = {
          name,
          imageUrl: path,
          hint,
          type
      }
      await QuizesSchema.create(query)
        .then((result) => {

          res.status(200).send({
            message: "Upload successfully",
            data: result
          });
        })
        .catch((err) => {
           res.status(400).send({
            message: "Upload failed",
            error: err
          });
        })
    } else {
      res.status(400).send("Bad request");
    } 

})

export {CreateQuizRouter};

