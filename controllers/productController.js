// controllers/productController.js
const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products (Filtering, Sorting, Pagination)
// @route   GET /api/products
exports.getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const queryObj = { ...req.query };
    const removeFields = ['page', 'limit', 'sort', 'fields'];
    removeFields.forEach(field => delete queryObj[field]);
    
    // Advanced filtering (e.g., price[gte]=100)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination
    const total = await Product.countDocuments();
    const products = await query.skip(skip).limit(limit);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Low-Stock Alert Report
// @route   GET /api/products/low-stock
exports.getLowStock = async (req, res, next) => {
  try {
    // $expr allows us to compare two fields in the same document
    const lowStockItems = await Product.find({
      $expr: { $lt: ["$quantity", "$reorderLevel"] }
    });
    
    res.status(200).json({
      count: lowStockItems.length,
      lowStockItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Category-wise Inventory Summary (Aggregation)
// @route   GET /api/products/summary
exports.getSummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          avgPrice: { $avg: "$price" }
        }
      }
    ]);
    
    res.status(200).json({
      categories: summary.length,
      summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Stock Adjustment (Restock / Sale)
// @route   PATCH /api/products/:id/stock
exports.updateStock = async (req, res, next) => {
  try {
    const { change } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    const newQuantity = product.quantity + change;
    if (newQuantity < 0) return res.status(400).json({ message: "Stock cannot be negative" });
    
    product.quantity = newQuantity;
    await product.save(); // Triggers virtuals to update
    
    res.status(200).json({ message: "stock updated", product });
  } catch (error) {
    next(error);
  }
};