# 📚 Library Management API

A comprehensive **Library Management System** built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**. This API provides full CRUD operations for books and borrowing management with advanced features like filtering, sorting, aggregation, and robust error handling.

## 🚀 Features

- ✅ **Complete Book Management** (Create, Read, Update, Delete)
- ✅ **Book Borrowing System** with inventory management
- ✅ **Advanced Filtering & Sorting** for book queries
- ✅ **MongoDB Aggregation Pipeline** for borrowed books summary
- ✅ **Mongoose Static & Instance Methods**
- ✅ **Mongoose Middleware** (Pre & Post hooks)
- ✅ **Comprehensive Input Validation** with Zod
- ✅ **Robust Error Handling** with custom error classes
- ✅ **TypeScript** for type safety
- ✅ **Transaction Support** for data consistency

## 🛠️ Technologies Used

- **Node.js** & **Express.js** - Backend framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd library-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DB_URL=mongodb://localhost:27017/library-management
# Or for MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/library-management
```

### 4. Build the Application
```bash
npm run build
```

### 5. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### 📖 Book Management

#### 1. Create Book
- **POST** `/api/books`
- **Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### 2. Get All Books (with filtering & sorting)
- **GET** `/api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=10`
- **Query Parameters:**
  - `filter`: Filter by genre (`FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`)
  - `sortBy`: Sort field (default: `createdAt`)
  - `sort`: Sort direction `asc` or `desc` (default: `desc`)
  - `limit`: Number of results (default: `10`)

#### 3. Get Book by ID
- **GET** `/api/books/:bookId`

#### 4. Update Book
- **PUT** `/api/books/:bookId`
- **Body:** (partial update allowed)
```json
{
  "copies": 50
}
```

#### 5. Delete Book
- **DELETE** `/api/books/:bookId`

### 📚 Borrow Management

#### 6. Borrow a Book
- **POST** `/api/borrow`
- **Body:**
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 7. Get Borrowed Books Summary (Aggregation)
- **GET** `/api/borrow`
- Returns summary with total borrowed quantities per book

## 🎯 Key Implementation Features

### 1. Mongoose Static & Instance Methods
```typescript
// Instance method
bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

// Static method
bookSchema.statics.updateBookAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};
```

### 2. Mongoose Middleware
```typescript
// Pre-save middleware
bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

// Post-save middleware
bookSchema.post('save', function () {
  console.log(`Book "${this.title}" saved with ${this.copies} copies available`);
});
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── book/
│   │   │   ├── book.controller.ts
│   │   │   ├── book.interface.ts
│   │   │   ├── book.model.ts
│   │   │   ├── book.route.ts
│   │   │   ├── book.service.ts
│   │   │   └── book.validation.ts
│   │   └── borrow/
│   │       ├── borrow.controller.ts
│   │       ├── borrow.interface.ts
│   │       ├── borrow.model.ts
│   │       ├── borrow.route.ts
│   │       ├── borrow.service.ts
│   │       └── borrow.validation.ts
│   └── routes/
│       └── index.ts
├── config/
│   └── envConfig.ts
├── helpers/
│   └── AppError.ts
├── middlewares/
│   ├── globalErrorHandler.ts
│   ├── notFound.ts
│   └── validationRequest.ts
├── utils/
│   └── catchAsync.ts
├── app.ts
└── server.ts
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:

- **Validation Errors** (Zod & Mongoose)
- **Cast Errors** (Invalid MongoDB ObjectId)
- **Duplicate Key Errors** (Unique constraints)
- **Custom Application Errors**
- **404 Not Found Errors**

Example error response:
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

## 🧪 Testing the API

### Using Postman or Thunder Client:

1. **Create a Book:**
```
POST http://localhost:5000/api/books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "NON_FICTION",
  "isbn": "9780132350884",
  "description": "A handbook of agile software craftsmanship",
  "copies": 10
}
```

2. **Get Books with Filtering:**
```
GET http://localhost:5000/api/books?filter=NON_FICTION&sortBy=title&sort=asc&limit=5
```

3. **Borrow a Book:**
```
POST http://localhost:5000/api/borrow
Content-Type: application/json

{
  "book": "BOOK_ID_HERE",
  "quantity": 2,
  "dueDate": "2025-08-15T00:00:00.000Z"
}
```

## 🚀 Deployment

### Using Vercel:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Using Railway:
1. Connect repository to Railway
2. Add environment variables
3. Deploy with automatic builds

## 📝 Assignment Requirements Checklist

- ✅ **Express & TypeScript** - Implemented
- ✅ **MongoDB via Mongoose** - Implemented
- ✅ **Schema Validation** - Zod + Mongoose validation
- ✅ **Business Logic** - Inventory management on borrow
- ✅ **Aggregation Pipeline** - Borrowed books summary
- ✅ **Static/Instance Methods** - updateAvailability methods
- ✅ **Mongoose Middleware** - Pre/post save hooks
- ✅ **Filtering Features** - Genre filtering with sorting
- ✅ **Exact API Endpoints** - All endpoints match requirements
- ✅ **Error Handling** - Comprehensive error management

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

