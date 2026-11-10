Inventory and Data Management System

A RESTful backend for managing a product catalogue in a store or warehouse. The API provides product CRUD operations, safe stock adjustments, query-based filtering, sorting and pagination, and inventory reports generated with MongoDB aggregation.

Developed for Web Dev III, Assignment 3, using Node.js, Express, Mongoose and dotenv.

Table of Contents
Features
Tech Stack
Project Structure
Getting Started
Data Model
API Reference
Error Handling
Testing
License
Features
Product schema with field-level validation and a unique SKU
Complete CRUD operations for products
Filtering, sorting, field selection and pagination through query parameters
Stock adjustment for restocking and sales, with protection against negative stock
Low-stock report for products below their reorder level
Category-wise inventory summary using a MongoDB aggregation pipeline
Computed stockValue virtual field (price × quantity)
Centralized error handling with consistent responses
Environment-based configuration using dotenv
Tech Stack
Component	Technology
Runtime	Node.js
Framework	Express
Database	MongoDB
ODM	Mongoose
Configuration	dotenv
Development	nodemon
Project Structure
text
inventory-management/
├── controllers/
│   └── productController.js    # Request handling and business logic
├── middleware/
│   └── errorHandler.js         # Centralized error handling
├── models/
│   └── Product.js              # Mongoose schema and validation
├── routes/
│   └── productRoutes.js        # Route definitions
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js                   # Application entry point
Getting Started
Prerequisites
Node.js v18 or higher
MongoDB (local installation or MongoDB Atlas)
Installation
bash
git clone <repository-url>
cd inventory-management
npm install
Configuration

Create a .env file in the project root:

env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
NODE_ENV=development

When using MongoDB Atlas, set MONGO_URI to your Atlas connection string.

Running the Application
bash
# Start the server
npm start

# Start with automatic reload (development)
npm run dev

On a successful start, the console displays:

text
MongoDB Connected Successfully
Server running on port 5000
Data Model
Field	Type	Constraints
name	String	Required, trimmed
sku	String	Required, unique, trimmed
category	String	Required, trimmed
price	Number	Required, minimum 0
quantity	Number	Required, minimum 0
reorderLevel	Number	Required, minimum 0
supplier	String	Required, trimmed
stockValue	Virtual	Computed as price × quantity

The createdAt and updatedAt timestamps are added automatically.

API Reference

Base URL: http://localhost:5000/api/products

Method	Endpoint	Description
POST	/	Create a product
GET	/	List products with filtering, sorting and pagination
GET	/:id	Retrieve a single product
PUT	/:id	Update product details
PATCH	/:id/stock	Adjust stock level
DELETE	/:id	Delete a product
GET	/low-stock	Low-stock alert report
GET	/summary	Category-wise inventory summary
Create a Product

POST /api/products

json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}

Response: 201 Created, returning the stored product including its computed stockValue.

List Products

GET /api/products

Parameter	Example	Description
page	page=2	Page number (default: 1)
limit	limit=5	Items per page (default: 10)
sort	sort=-price,name	Comma-separated fields; prefix with - for descending order (default: newest first)
fields	fields=name,price	Return only the listed fields
Any field	category=Electronics	Exact-match filter
[gte], [gt], [lte], [lt]	price[gte]=100&price[lte]=500	Range filters

Example request:

text
GET /api/products?category=Furniture&price[gte]=1000&sort=-price&page=1&limit=10

Example response:

json
{
  "total": 12,
  "page": 1,
  "totalPages": 2,
  "count": 10,
  "products": []
}
Update a Product

PUT /api/products/:id

json
{
  "price": 140,
  "quantity": 60
}

Schema validators run on update, so invalid values are rejected.

Adjust Stock

PATCH /api/products/:id/stock

json
{
  "change": 10
}

Use a positive value to restock and a negative value to record a sale. If the resulting quantity would be below zero, the API responds with 400 Bad Request.

Delete a Product

DELETE /api/products/:id

json
{
  "message": "Product deleted",
  "id": "<product id>"
}
Low-Stock Report

GET /api/products/low-stock

Returns all products where quantity is below reorderLevel.

json
{
  "count": 4,
  "lowStockItems": []
}
Category Summary

GET /api/products/summary

Groups products by category using an aggregation pipeline and returns the item count, total quantity, total stock value and average price for each category.

json
{
  "categories": 5,
  "summary": [
    {
      "_id": "Electronics",
      "totalItems": 4,
      "totalQuantity": 96,
      "totalStockValue": 343984,
      "avgPrice": 5636.5
    }
  ]
}
Error Handling

Errors are handled by a single middleware and returned in a consistent format:

json
{
  "success": false,
  "error": "Price cannot be negative"
}
Condition	Status Code
Validation failure	400
Duplicate SKU	400
Insufficient stock	400
Invalid ID format	404
Product not found	404
Unexpected server error	500
Testing

The API can be tested with Postman, Thunder Client or curl:

bash
curl http://localhost:5000/api/products

To exercise pagination, the low-stock report and the category summary, seed the database with 10 to 12 products across several categories, including some at or below their reorder level.

License

This project is licensed under the ISC License.
