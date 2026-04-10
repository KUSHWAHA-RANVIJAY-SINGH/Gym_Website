const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  stockLeft: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  lastRestocked: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  }
}, { timestamps: true });

// Pre-save hook to automatically update status based on stockLevel
inventorySchema.pre('save', function(next) {
  if (this.stockLeft <= 0) {
    this.status = 'Out of Stock';
  } else if (this.stockLeft <= 5) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);
