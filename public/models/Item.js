const mongoose = require('mongoose');

// Define schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Create model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
