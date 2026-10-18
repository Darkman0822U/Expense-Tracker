# API Reference

## GET /api/expenses

**Purpose:**
Gets all expenses.

**Method:**
GET

**Request:**
No request body.

**Response:**
Returns a list of expenses.

---

## GET /api/expenses/:id

**Purpose:**
Gets one expense by ID.

**Method:**
GET

**Request:**
No request body.

**Response:**
Returns one expense object.

---

## POST /api/expenses

**Purpose:**
Creates a new expense.

**Method:**
POST

**Request body:**
```json
{
  "title": "Lunch",
  "amount": 12.5,
  "category": "Food",
  "date": "2026-09-08",
  "note": "With friends"
}
```

**Response:**
Returns the created expense object.

---

## PUT /api/expenses/:id

**Purpose:**
Updates one expense.

**Method:**
PUT

**Request body:**
```json
{
  "title": "Lunch",
  "amount": 15,
  "category": "Food",
  "date": "2026-09-08",
  "note": "Updated note"
}
```

**Response:**
Returns the updated expense object.

---

## DELETE /api/expenses/:id

**Purpose:**
Deletes one expense.

**Method:**
DELETE

**Request:**
No request body.

**Response:**
Returns a success message.
