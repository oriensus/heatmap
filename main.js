const express = require('express')
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const db = require('./server/data');

const PORT = 6969;
const webServer = express();

webServer.use(volleyball);
webServer.use(bodyParser.json());
webServer.use(bodyParser.urlencoded({ extended: true }));
webServer.use(express.static(path.join(__dirname, './public')));

webServer.use('/api', routes);

webServer.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../stackathon/public/index.html'));
  }); // Send index.html for any other requests

webServer.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });

webServer.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
    db.sync({force: false});
    console.log("Database connected!");
});