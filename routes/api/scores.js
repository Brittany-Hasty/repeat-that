const express = require("express");
const router = express.Router();
const Score = require('../../models/Score');
const mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);

router.get('/', (req, res) => {
    Score.find()
        .sort({
            score: -1
        })
        .then(scores => res.json(scores))
        .catch(err => res.status(404).json({
            noScoresFound: 'No scores found'
        }));
});


router.post('/', (req, res) => {
        const newScore = new Score({
            score: req.body.score,
            username: req.body.username,
        });

        newScore.save()
            .then(score => res.json(score));
    });

module.exports = router;