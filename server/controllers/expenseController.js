const mongoose = require('mongoose');
const Expense = require('../models/Expense');

const buildExpenseData = (body) => {
  const title = body.title ? body.title.trim() : '';
  const category = body.category ? body.category.trim() : '';
  const note = body.note ? body.note.trim() : '';
  const amount = Number(body.amount);
  const date = body.date ? new Date(body.date) : new Date();

  return {
    title,
    amount,
    category,
    note,
    date
  };
};

const isValidExpenseData = (expenseData) => {
  if (!expenseData.title) {
    return 'Title is required.';
  }

  if (!expenseData.category) {
    return 'Category is required.';
  }

  if (Number.isNaN(expenseData.amount) || expenseData.amount <= 0) {
    return 'Amount must be a number greater than 0.';
  }

  if (Number.isNaN(expenseData.date.getTime())) {
    return 'Date is invalid.';
  }

  return '';
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get expenses.' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get the expense.' });
  }
};

const createExpense = async (req, res) => {
  try {
    const expenseData = buildExpenseData(req.body);
    const validationMessage = isValidExpenseData(expenseData);

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const createdExpense = await Expense.create(expenseData);
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create the expense.' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    const expenseData = buildExpenseData(req.body);
    const validationMessage = isValidExpenseData(expenseData);

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expenseData, {
      new: true,
      runValidators: true
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update the expense.' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    res.status(200).json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete the expense.' });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};
