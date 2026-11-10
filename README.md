📦 Inventory and Data Management System

A RESTful backend application built to demonstrate database-driven development, schema validation, advanced querying and aggregation reports, built entirely from scratch without any pre-built admin panel or inventory boilerplate.

✨ Features
Product Schema & Validation: Mongoose schema with field-level validation and a unique SKU.
Full CRUD Operations: Create, read, update and delete products.
Filtering, Sorting & Pagination: Query-string based filtering, sorting, field selection and pagination.
Safe Stock Adjustment: Restock and sale operations that prevent negative stock.
Low-Stock Alert Report: Lists products that have fallen below their reorder level.
Category-wise Summary: MongoDB aggregation pipeline for inventory totals per category.
Centralized Error Handling: Consistent error responses for validation, duplicate and invalid ID errors.
🛠️ Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB
ODM: Mongoose
Config: dotenv
Dev Tool: nodemon
📂 Project Structure

The codebase follows a clean, modular architecture to ensure maintainability and separation of concerns:

text
inventory-management/
├── controllers/         # Request handling logic
│   └── productController.js
├── middleware/          # Centralized error handling
│   └── errorHandler.js
├── models/              # Mongoose schema and validation
│   └── Product.js
├── routes/              # Express API routes
│   └── productRoutes.js
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json         # Dependencies and scripts
└── server.js            # Server entry point and DB connection
1. Prerequisites

Make sure you have the following installed:

Node.js (v18 or higher)
MongoDB (Local server or MongoDB Atlas)
2. Installation

Clone the repository and install dependencies:

bash
git clone <your-repository-url>
cd inventory-management
npm install
3. Environment Variables

Create a .env file in the project root:

env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
NODE_ENV=development
4. Run the Server
bash
npm start        # Start the server
npm run dev      # Start with nodemon (auto-restart)
🧾 Product Schema
Field	Type	Rules
name	String	Required
sku	String	Required, unique
category	String	Required
price	Number	Required, minimum 0
quantity	Number	Required, minimum 0
reorderLevel	Number	Required, minimum 0
supplier	String	Required
stockValue	Virtual	price × quantity
API Endpoints
POST /api/products - Create a product
GET /api/products - Get all products (filter, sort, paginate)
GET /api/products/:id - Get a single product
PUT /api/products/:id - Update product details
PATCH /api/products/:id/stock - Adjust stock (positive to restock, negative for a sale)
DELETE /api/products/:id - Delete a product
GET /api/products/low-stock - Low-stock alert report
GET /api/products/summary - Category-wise inventory summary
Query Parameters (GET /api/products)
page, limit - Pagination (defaults: 1 and 10)
sort - e.g. sort=-price,name (prefix - for descending)
fields - e.g. fields=name,price
category=Electronics - Filter by field value
price[gte]=100&price[lte]=500 - Range filters (gte, gt, lte, lt)
Example Request

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
