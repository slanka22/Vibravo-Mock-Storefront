var express = require('express');
var path = require('path');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IST256Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// POST endpoint for form submission
app.post('/submitForm', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const newUser = new User({ firstName, lastName, email });

        await newUser.save();

        console.log('User saved to MongoDB:', newUser);
        res.status(200).send({ message: 'Form data saved successfully to MongoDB' });
    } catch (error) {
        console.error('Error saving to MongoDB:', error);

        res.status(500).send({ message: 'Error saving form data', error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'firstName lastName');

        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Error fetching user data', error: error.message });
    }
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('404 Not Found');
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send('Error: ' + err.message);
});

module.exports = app;
