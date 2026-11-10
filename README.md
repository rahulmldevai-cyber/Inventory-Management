# 📦 Inventory and Data Management System

## 🎓 Assignment 3

A backend-based Inventory Management System developed using **Node.js, Express.js, MongoDB, and Mongoose**. This project allows users to manage product records and inventory stock through RESTful APIs.

## 🛠️ Technologies Used

- 🟢 **Node.js** – JavaScript runtime environment.
- 🚀 **Express.js** – Backend web framework.
- 🍃 **MongoDB** – NoSQL database.
- 🔗 **Mongoose** – MongoDB object modeling.
- 🔐 **dotenv** – Environment variable management.
- 🧪 **Thunder Client** – API testing.

## ✨ Features

- ➕ Create new products.
- 📋 Retrieve all products.
- 🔍 Retrieve a product by ID.
- ✏️ Update existing product details.
- 🗑️ Delete products.
- 📦 Update product stock.
- 🏷️ Filter products by category.
- ↕️ Sort products by price.
- 📄 Pagination for product listing.
- ⚠️ Low-stock report.
- 📊 Inventory summary.
- ✅ Schema validation and error handling.

## 🔌 API Endpoints

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| 🟢 GET | `/api/products` | Get all products |
| 🟡 POST | `/api/products` | Create a product |
| 🟢 GET | `/api/products/:id` | Get product by ID |
| 🔵 PUT | `/api/products/:id` | Update product |
| 🔴 DELETE | `/api/products/:id` | Delete product |
| 🟠 PATCH | `/api/products/:id/stock` | Update stock |
| 🟢 GET | `/api/products/low-stock` | Get low-stock products |
| 🟢 GET | `/api/products/summary` | Get inventory summary |

## ⚙️ Installation and Setup

**1️⃣ Clone or download the project**

Open the project folder in VS Code.

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Configure environment variables**

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory
```

**4️⃣ Start the server**

```bash
npx nodemon server.js
```

🚀 The server will run at:

`http://localhost:5000`

## 🧪 API Testing

All API endpoints can be tested using Thunder Client in Visual Studio Code.

Testing includes:

- ➕ Creating and retrieving products.
- ✏️ Updating and deleting products.
- 📦 Testing stock increase and decrease.
- ⚠️ Checking negative stock validation.
- 🔍 Filtering and sorting products.
- 📄 Testing pagination.
- 📊 Checking low-stock products and inventory summary.

## 🎯 Learning Outcomes

Through this assignment, I learned:

- 🌐 Building RESTful APIs using Express.js.
- 🍃 Connecting Node.js applications with MongoDB.
- 🏗️ Using Mongoose schemas and models.
- 🔄 Implementing CRUD operations.
- 📩 Handling HTTP requests and responses.
- 🔐 Managing environment variables.
- 🧪 Testing APIs using Thunder Client.
- ✅ Implementing validation and error handling.

## 🏁 Conclusion

This assignment helped me understand backend development and database management by building an Inventory Management System using Node.js, Express.js, and MongoDB.

---

⭐ **Developed as part of Assignment 3 – Backend Development Practice.**
