import mongoose, {Schema} from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/hangman_quiz');

const QuizesSchema = mongoose.model('quizes', new Schema(
    {
        name: String,
        type: String,
        imageUrl: String,
        hint: String
    },  
    { 
        timestamps: true 
    }
));

export {QuizesSchema};