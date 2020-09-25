const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    score: {
        type: Number,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

let Score = mongoose.model("Score", ScoreSchema);
module.exports = Score;