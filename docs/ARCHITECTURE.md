# Architecture

## Simple flow

```text
User
 ↓
React
 ↓
Express / Node.js
 ↓
Mongoose
 ↓
MongoDB
```

## How it works

- **React** shows the form, list, and summary cards.
- **Node.js** runs the backend server.
- **Express** handles API routes like `GET`, `POST`, `PUT`, and `DELETE`.
- **Mongoose** connects the app to MongoDB and helps manage the expense data.
- **MongoDB** stores the expenses.

## How frontend and backend communicate

The React app uses `fetch()` to send requests to the backend API.

Example flow:

1. The user fills the form.
2. React sends the data with `fetch()`.
3. Express receives the request.
4. The controller checks the data.
5. Mongoose saves or reads the data.
6. MongoDB returns the result.
7. React updates the screen.

## Important folders

### `client/`

This folder has the React frontend.

- `src/pages/` has the main page.
- `src/components/` has small reusable parts like the form and list.
- `src/services/` has API calls.

### `server/`

This folder has the backend.

- `models/` has the MongoDB schema.
- `routes/` has the API route definitions.
- `controllers/` has the request logic.
- `server.js` starts the server and connects to MongoDB.
