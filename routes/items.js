const express = require('express');
const Item = require('../models/Item'); // Import the Item model
const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newItem = new Item({ name, description });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item' });
  }
});

module.exports = router;
