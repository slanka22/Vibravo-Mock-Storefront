var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint for form submission
app.post('/submitForm', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'signUpInfo.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let signUpInfo = JSON.parse(data || '[]');

        const newEntry = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        signUpInfo.push(newEntry);

        fs.writeFile(filePath, JSON.stringify(signUpInfo, null, 2), 'utf8', () => {
            res.status(200).send('Form submitted successfully');
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('Error: ' + err.message);
});

module.exports = app;
