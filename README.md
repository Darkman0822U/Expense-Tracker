# Expense Tracker

A small MERN stack app for tracking personal expenses. You can add, edit, view, and delete expenses with a simple React UI and an Express + MongoDB backend.

## Screenshot

> Add a screenshot here after you run the app.

## Features

- Add a new expense
- Edit an existing expense
- Delete an expense
- View all saved expenses
- See simple summary cards
- Basic validation and error messages
- Responsive design for mobile, tablet, and desktop

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- HTML
- CSS

## Folder Structure

```text
expense-tracker/
├── client/
├── server/
├── docs/
├── .gitignore
├── package.json
└── README.md 
```

## Installation

1. Make sure MongoDB is running on your machine, or use your MongoDB Atlas connection string.
2. Install server dependencies:

```bash
npm install --prefix server
```

3. Install client dependencies:

```bash
npm install --prefix client
```

## Environment Variables

Create or update `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
```

If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## How to Run

Open two terminals:

### Terminal 1 - Server

```bash
npm start --prefix server
```

### Terminal 2 - Client

```bash
npm start --prefix client
```

The React app will open in the browser, and it will talk to the backend through `/api/expenses`.

## API Overview

- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get one expense by ID
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Future Improvements

- Add search and filtering
- Add monthly reports
- Add categories chart
- Add user authentication
- Add pagination for large lists

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Features](docs/FEATURES.md)
- [API Reference](docs/API.md)
