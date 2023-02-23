const express = require('express');
const { ObjectId } = require('mongodb');
const mongodb = require('mongodb').MongoClient;


const app = express();
const port = 3030;

const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

let db;

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        db = client.db();
        app.listen(port, () => {
            console.log(`Listening to some dope beats by Deltron ${port}`);
        });
    }
);

app.use(express.json());




