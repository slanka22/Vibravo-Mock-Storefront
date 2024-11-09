const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the HTML file and static assets
app.use(express.static(path.join(__dirname)));

// REST endpoint for handling form submissions
app.post('/api/submissions', (req, res) => {
    const formData = req.body;
    const dataFilePath = path.join(__dirname, 'signUpForm.json');

    // Load existing data or initialize a new array
    let data = [];
    if (fs.existsSync(dataFilePath)) {
        data = JSON.parse(fs.readFileSync(dataFilePath));
    }

    // Add the new form submission to the data array
    data.push(formData);

    // Write updated data to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4));

    // Send a response back to the client
    res.json({ message: 'Form data saved successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

