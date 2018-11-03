const express = require('express');
const app = express();
const fs = require('fs');

const data = {};

fs.readdir("data", function( err, files ) {
    if( err ) {
        console.error( "Could not get data.", err );
        process.exit( 1 );
    }

    files.forEach(function( file, index ) {
        fs.readFile("data/" + file,  (err, rawCharacterData) => {
            if (err) throw err;
            let jsonData = JSON.parse(rawCharacterData);
            data[jsonData.type] = jsonData;
        });
    });
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
});

app.get('/cards', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data[req.query.character]);
});

app.use(express.static(__dirname + '/build'));

app.listen(3003, () => {
    console.log('Server running on port 3003.');
});