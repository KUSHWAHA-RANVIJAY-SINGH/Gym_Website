const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Member Login via Phone Number
router.post('/login', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  try {
    const member = await Member.findOne({ phone });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    // In a real app we would use JWT here. For simplicity, we just return member ID
    res.json({ 
      message: 'Login successful', 
      memberId: member._id,
      name: member.name
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Member Data
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Progress
router.post('/:id/progress', async (req, res) => {
  const { date, weight, notes } = req.body;
  if (!date || !weight) return res.status(400).json({ message: 'Date and weight required' });

  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.progressHistory.push({ date, weight, notes });
    await member.save();

    res.json({ message: 'Progress updated', progressHistory: member.progressHistory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
