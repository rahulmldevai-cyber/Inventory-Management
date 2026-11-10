// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProduct, getAllProducts, getProductById, updateProduct, 
  deleteProduct, getLowStock, getSummary, updateStock
} = require('../controllers/productController');

// Note: Specific routes MUST be defined before parameterized routes (/:id)
router.get('/low-stock', getLowStock);
router.get('/summary', getSummary);

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.patch('/:id/stock', updateStock);

module.exports = router;