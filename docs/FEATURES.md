# Features

## 1. Add Expense

**What it does:**
Lets the user save a new expense.

**How it works:**
The user fills the form and clicks the save button. React sends the data to the backend. The backend checks the data and saves it in MongoDB.

**Frontend:**
`ExpenseForm`

**Backend:**
`POST /api/expenses`

**Database:**
A new expense document is stored with title, amount, category, date, and note.

## 2. Edit Expense

**What it does:**
Lets the user change an existing expense.

**How it works:**
The user clicks the edit button on one expense. The form gets filled with that expense data. After changes, React sends an update request to the backend.

**Frontend:**
`ExpenseForm` and `ExpenseItem`

**Backend:**
`PUT /api/expenses/:id`

**Database:**
The matching expense document is updated in MongoDB.

## 3. Delete Expense

**What it does:**
Lets the user remove an expense.

**How it works:**
The user clicks the delete button and confirms the action. React sends a delete request to the backend.

**Frontend:**
`ExpenseItem`

**Backend:**
`DELETE /api/expenses/:id`

**Database:**
The matching expense document is removed from MongoDB.

## 4. View All Expenses

**What it does:**
Shows all saved expenses on the page.

**How it works:**
React loads the data from the backend when the page opens and shows it in a list.

**Frontend:**
`HomePage` and `ExpenseList`

**Backend:**
`GET /api/expenses`

**Database:**
Reads all expense documents from MongoDB.

## 5. Summary Cards

**What it does:**
Shows total spending, number of records, average expense, and the largest expense.

**How it works:**
React calculates these values from the expense list after the data loads.

**Frontend:**
`HomePage`

**Backend:**
No special API is needed. It uses the list from `GET /api/expenses`.

**Database:**
Uses the same expense data already stored in MongoDB.

## 6. Basic Validation

**What it does:**
Stops empty or invalid data from being saved.

**How it works:**
The form checks required fields first. The backend checks again before saving.

**Frontend:**
`ExpenseForm`

**Backend:**
`expenseController.js`

**Database:**
Invalid data is not saved.

## 7. Responsive UI

**What it does:**
Makes the app work on desktop, tablet, and mobile.

**How it works:**
CSS media queries change the layout for smaller screens.

**Frontend:**
`App.css`

**Backend:**
Not needed.

**Database:**
Not needed.
