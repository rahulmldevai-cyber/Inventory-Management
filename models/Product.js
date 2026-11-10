// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'], trim: true },
  sku: { type: String, required: [true, 'SKU is required'], unique: true, trim: true },
  category: { type: String, required: [true, 'Category is required'], trim: true },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  quantity: { type: Number, required: true, min: [0, 'Quantity cannot be negative'] },
  reorderLevel: { type: Number, required: true, min: 0 },
  supplier: { type: String, required: true, trim: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for stockValue (Price * Quantity)
productSchema.virtual('stockValue').get(function() {
  return this.price * this.quantity;
});

module.exports = mongoose.model('Product', productSchema);