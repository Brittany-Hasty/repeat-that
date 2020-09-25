const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const app = express();
const path = require('path');
const port = process.env.PORT || 5500;
const scores = require("./routes/api/scores");

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use("/api/scores", scores);

app.get("/", (req, res) => res.send("ping"));
app.listen(port, () => console.log(`Server is running on port ${port}`));