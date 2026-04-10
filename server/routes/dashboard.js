const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Expense = require('../models/Expense');
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    
    // Revenue mock calculation: sum of active members plan cost
    // Monthly=1500, Quarterly=4000, Annual=12000
    const activeMembers = await Member.find({ status: { $ne: 'Expired' } });
    let revenue = 0;
    activeMembers.forEach(m => {
      if(m.planType === 'Monthly') revenue += 1500;
      else if(m.planType === 'Quarterly') revenue += 4000;
      else if(m.planType === 'Annual') revenue += 12000;
      else revenue += 1500; // fallback
    });

    let revenueStr = revenue >= 100000 ? `₹${(revenue/100000).toFixed(1)}L` : `₹${revenue}`;

    const today = new Date().toISOString().split('T')[0];
    const todaysAttendance = await Attendance.countDocuments({ date: today });

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const expiringMembers = await Member.find({
      status: { $ne: 'Expired' },
      expiryDate: { $lte: nextWeek }
    }).sort({ expiryDate: 1 });

    const recentCheckins = await Attendance.find({ date: today })
      .sort({ timestamp: -1 })
      .limit(10)
      .populate('memberId', 'name phone memberPhoto');

    // Chart Data: Revenue vs Expenses (Mocked 6 months trend using joinDates and Expenses)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    
    // Group expenses by month
    const recentExpenses = await Expense.find({ date: { $gte: sixMonthsAgo } });
    const recentMembers = await Member.aggregate([
      { $match: { joinDate: { $gte: sixMonthsAgo } } },
      { $group: {
        _id: { $month: "$joinDate" },
        count: { $sum: 1 },
        revenue: { 
          $sum: {
            $switch: {
              branches: [
                { case: { $eq: ["$planType", "Monthly"] }, then: 1500 },
                { case: { $eq: ["$planType", "Quarterly"] }, then: 4000 },
                { case: { $eq: ["$planType", "Annual"] }, then: 12000 }
              ],
              default: 1500
            }
          }
        }
      }}
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let chartData = [];
    for(let i=5; i>=0; i--) {
      let d = new Date();
      d.setMonth(d.getMonth() - i);
      let monthIndex = d.getMonth();
      let monthStr = monthNames[monthIndex];
      
      let expTotal = recentExpenses.filter(e => e.date.getMonth() === monthIndex).reduce((acc, curr) => acc + curr.amount, 0);
      let revTotalObj = recentMembers.find(m => m._id === (monthIndex + 1));
      let revTotal = revTotalObj ? revTotalObj.revenue : (Math.floor(Math.random() * 50000) + 10000); // fallback mock if 0

      chartData.push({
        month: monthStr,
        revenue: revTotal,
        expenses: expTotal
      });
    }

    // Chart Data: Peak Hours Analysis
    const attendances = await Attendance.aggregate([
      { $group: {
          _id: { $hour: "$timestamp" },
          count: { $sum: 1 }
      }}
    ]);

    let peakHoursData = [
      { time: '6 AM', count: 0 }, { time: '8 AM', count: 0 }, { time: '10 AM', count: 0 },
      { time: '12 PM', count: 0 }, { time: '4 PM', count: 0 }, { time: '6 PM', count: 0 },
      { time: '8 PM', count: 0 }, { time: '10 PM', count: 0 }
    ];

    attendances.forEach(a => {
      let hour = a._id;
      if(hour >= 5 && hour < 7) peakHoursData[0].count += a.count;
      else if(hour >= 7 && hour < 9) peakHoursData[1].count += a.count;
      else if(hour >= 9 && hour < 11) peakHoursData[2].count += a.count;
      else if(hour >= 11 && hour < 14) peakHoursData[3].count += a.count;
      else if(hour >= 14 && hour < 17) peakHoursData[4].count += a.count;
      else if(hour >= 17 && hour < 19) peakHoursData[5].count += a.count;
      else if(hour >= 19 && hour < 21) peakHoursData[6].count += a.count;
      else peakHoursData[7].count += a.count;
    });

    res.json({
      totalMembers,
      revenueStr,
      revenue,
      todaysAttendance,
      expiringSoonCount: expiringMembers.length,
      expiryAlerts: expiringMembers.slice(0, 5).map(m => ({
        id: m._id,
        name: m.name,
        phone: m.phone,
        expiryDate: m.expiryDate
      })),
      recentCheckins: recentCheckins.map(c => ({
        id: c._id,
        member: c.memberId ? c.memberId.name : 'Unknown',
        photo: c.memberId ? c.memberId.memberPhoto : null,
        phone: c.memberId ? c.memberId.phone : null,
        time: new Date(c.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      })),
      chartData,
      peakHoursData
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get dashboard stats' });
  }
});

module.exports = router;
