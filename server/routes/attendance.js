const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Member = require('../models/Member');
const Admin = require('../models/Admin');

// Mark attendance via QR string
router.post('/scan', async (req, res) => {
  const { qrCodeString } = req.body;
  try {
    const member = await Member.findOne({ qrCodeString });
    if (!member) {
      return res.status(404).json({ message: 'Member not found or invalid QR' });
    }

    if (member.status === 'Expired') {
      return res.status(403).json({ 
        message: 'Membership expired', 
        member: { name: member.name, photo: member.memberPhoto } 
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const existing = await Attendance.findOne({ memberId: member._id, date: today });
    
    if (existing) {
      return res.status(200).json({ 
        message: 'Already checked in today', 
        member: { name: member.name, photo: member.memberPhoto } 
      });
    }

    const attendance = new Attendance({
      memberId: member._id,
      date: today
    });

    await attendance.save();
    res.status(201).json({ 
      message: 'Attendance marked successfully', 
      member: { name: member.name, photo: member.memberPhoto } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mobile Wall-QR Check-in (Device Bound)
router.post('/checkin-qr', async (req, res) => {
  const { gymId, identifier, deviceInfo, deviceId } = req.body;
  
  if (!gymId || !identifier) {
    return res.status(400).json({ message: 'Gym ID and identifier (phone/ID) are required' });
  }

  try {
    const admin = await Admin.findById(gymId);
    if (!admin) {
      return res.status(404).json({ message: 'Gym not found' });
    }

    // Lookup member by phone or qrCodeString
    const member = await Member.findOne({ 
      $or: [
        { phone: identifier },
        { qrCodeString: identifier }
      ]
    });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (member.status === 'Expired') {
      return res.status(403).json({ 
        message: 'Membership expired', 
        member: { name: member.name, photo: member.memberPhoto, expiryDate: member.expiryDate } 
      });
    }

    // Device Fingerprinting Check
    if (deviceId) {
      if (!member.deviceId) {
        member.deviceId = deviceId;
        await member.save();
      } else if (member.deviceId !== deviceId) {
        return res.status(403).json({
          message: 'DeviceMismatched',
          member: { name: member.name, photo: member.memberPhoto, expiryDate: member.expiryDate }
        });
      }
    }

    const today = new Date().toISOString().split('T')[0];
    const existing = await Attendance.findOne({ memberId: member._id, date: today });
    
    if (existing) {
      return res.status(200).json({ 
        message: 'Already checked in today', 
        member: { name: member.name, photo: member.memberPhoto, expiryDate: member.expiryDate } 
      });
    }

    const attendance = new Attendance({
      memberId: member._id,
      date: today,
      deviceInfo
    });

    await attendance.save();

    // Emit Real-time Admin Alert
    if (req.io) {
      const payload = {
        gymId,
        message: `${member.name} just checked in!`,
        member: {
          name: member.name,
          photo: member.memberPhoto,
          time: new Date()
        }
      };
      req.io.emit(`checkinAlert-${gymId}`, payload); // Specific room
      req.io.emit(`checkinAlert`, payload); // Global room fallback
    }
    // end of emit block

    res.status(201).json({ 
      message: 'Check-in successful', 
      member: { name: member.name, photo: member.memberPhoto, expiryDate: member.expiryDate } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get today's attendance
router.get('/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const records = await Attendance.find({ date: today })
      .populate('memberId', 'name phone status memberPhoto qrCodeString')
      .sort({ timestamp: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance history by date
router.get('/history', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'Date is required' });
  try {
    const records = await Attendance.find({ date })
      .populate('memberId', 'name phone status memberPhoto qrCodeString')
      .sort({ timestamp: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get retention (members not visited in last 10 days)
router.get('/retention', async (req, res) => {
  try {
    const tenDaysAgoDate = new Date();
    tenDaysAgoDate.setDate(tenDaysAgoDate.getDate() - 10);
    
    const recentAttendances = await Attendance.find({ 
      timestamp: { $gte: tenDaysAgoDate } 
    }).distinct('memberId');

    const inactiveMembers = await Member.find({
      _id: { $nin: recentAttendances },
      status: 'Active'
    }).select('name phone memberPhoto status qrCodeString');

    res.json(inactiveMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Download Monthly PDF Report
const PDFDocument = require('pdfkit');
router.get('/report/monthly', async (req, res) => {
  const { month } = req.query; // Format expected: YYYY-MM
  if (!month) return res.status(400).json({ message: 'Month string (YYYY-MM) is required' });

  try {
    const startDate = `${month}-01`;
    const endDate = `${month}-31`; // A simple string gt/lt works for lexicographical YYYY-MM-DD

    const records = await Attendance.find({
      date: { $gte: startDate, $lte: endDate }
    }).populate('memberId', 'name phone').sort({ date: 1, timestamp: 1 });

    const doc = new PDFDocument({ margin: 50 });
    let filename = `Attendance_Report_${month}.pdf`;
    
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Header
    doc.fontSize(20).text('Monthly Attendance Report', { align: 'center' });
    doc.fontSize(12).fillColor('gray').text(`Month: ${month}`, { align: 'center' });
    doc.moveDown(2);

    // Table Header
    doc.fillColor('black').fontSize(12).font('Helvetica-Bold');
    doc.text('Date', 50, doc.y, { continued: true, width: 100 });
    doc.text('Time', 150, doc.y, { continued: true, width: 100 });
    doc.text('Member Name', 250, doc.y, { continued: true, width: 200 });
    doc.text('Phone', 450, doc.y);
    doc.moveDown(0.5);
    
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.font('Helvetica');
    // Table Rows
    records.forEach(r => {
      const h = doc.y;
      if (h > 700) doc.addPage();
      
      const timeStr = new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
      const name = r.memberId ? r.memberId.name : 'Unknown';
      const phone = r.memberId ? r.memberId.phone : 'Unknown';

      doc.text(r.date, 50, doc.y, { continued: true, width: 100 });
      doc.text(timeStr, 150, doc.y, { continued: true, width: 100 });
      doc.text(name, 250, doc.y, { continued: true, width: 200 });
      doc.text(phone, 450, doc.y);
      doc.moveDown(0.5);
    });

    doc.end();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
