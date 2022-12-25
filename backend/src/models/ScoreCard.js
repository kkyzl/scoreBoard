// name, subject, score
//define Schema model
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ScoreSchema = new Schema({
  name: String,
  subject: String,
  score: Number,
});

const ScoreCard = mongoose.model("Score", ScoreSchema);

export default ScoreCard;
