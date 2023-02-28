const express = require('express');
const db = require('./config/connection');
const allRoutes = require('./controllers');

const PORT = 3030;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(allRoutes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening to so dope beats by Deltron ${PORT}!`);
    });
});
