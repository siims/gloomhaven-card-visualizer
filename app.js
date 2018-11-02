const express = require('express');
const app = express();
const data = require('./data.json');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
});

app.get('/scoundrel', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

app.use(express.static(__dirname + '/build'));

app.listen(3003, () => {
    console.log('Server running on port 3003.');
});