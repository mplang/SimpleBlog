/**
 * @file
 * Backend Node.js server for the SimpleBlog demo app.
 *
 * @author Michael P. Lang.
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3131;  // listening port

app.use(morgan('combined'));    // for logging
app.use(cors());    // for cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));  // for ... body parsing
app.use(bodyParser.json());

// Add model(s)
const models = require('./models/BlogPost');

// Add routes
// app.use(require('./routes'));
app.use(require("./routes/api/blog-routes"));

// Error handling.
app.use((req, res, next) => {
    const err = new Error('Not Found.');
    err.status = 404;
    next(err);
});

app.use(async function (err, req, res, next) {
    try {
        console.error(err);
        return res.status(500).send(err.message);
    }
    catch (err) {
        console.error("Error while handling other error.");
    }
});

// DB connection and server binding.
const connectDb = async function () {
    try {
        let username = "demouser";
        let password = "n9RJ2QzJYvpB";
        const dbUri = `mongodb://${username}:${password}@ds227255.mlab.com:27255/simple-blog?retryWrites=true`;
        await mongoose.connect(dbUri, { useNewUrlParser: true });
    }
    catch (err) {
        console.error("Error connecting to database.");
        throw err;
    }
}

new Promise(async (resolve, reject) => {
    try {
        await connectDb();
        console.log("Successfully connected to database.");
        resolve();
    }
    catch (err) {
        reject(err);
    }
}).then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}.`));
}).catch(err => {
    console.error(err);
    process.exit(1);
});
