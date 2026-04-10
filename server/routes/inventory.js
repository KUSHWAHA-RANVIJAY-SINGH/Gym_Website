const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().sort({ stockLeft: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new inventory item
router.post('/', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastRestocked: Date.now() },
      { new: true }
    );
    res.json({ message: 'Item updated', item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sell item (decrement stock)
router.post('/:id/sell', async (req, res) => {
  try {
    const { quantity } = req.body;
    const sellQty = parseInt(quantity) || 1;
    
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (item.stockLeft < sellQty) {
      return res.status(400).json({ message: 'Not enough stock' });
    }
    
    item.stockLeft -= sellQty;
    await item.save();
    
    res.json({ message: `Sold ${sellQty} unit(s) of ${item.itemName}`, item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
