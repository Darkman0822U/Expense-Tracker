import { useEffect, useMemo, useState } from 'react';
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../services/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR'
});

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      setError(error.message || 'Failed to load expenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const expenseCount = expenses.length;
  const averageExpense = expenseCount > 0 ? totalAmount / expenseCount : 0;
  const largestExpense = expenseCount > 0
    ? expenses.reduce((biggest, current) => (current.amount > biggest.amount ? current : biggest), expenses[0])
    : null;

  const handleSave = async (expenseData) => {
    try {
      setError('');
      setMessage('');

      if (selectedExpense) {
        await updateExpense(selectedExpense._id, expenseData);
        setMessage('Expense updated successfully.');
      } else {
        await createExpense(expenseData);
        setMessage('Expense added successfully.');
      }

      setSelectedExpense(null);
      await loadExpenses();
    } catch (error) {
      setError(error.message || 'Failed to save the expense.');
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setSelectedExpense(null);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Do you want to delete this expense?');

    if (!isConfirmed) {
      return;
    }

    try {
      setError('');
      setMessage('');

      await deleteExpense(id);
      setMessage('Expense deleted successfully.');

      if (selectedExpense && selectedExpense._id === id) {
        setSelectedExpense(null);
      }

      await loadExpenses();
    } catch (error) {
      setError(error.message || 'Failed to delete the expense.');
    }
  };

  const formatCurrency = (amount) => {
    return moneyFormatter.format(amount);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="section-label">MERN project</p>
        <h1>Expense Tracker</h1>
        <p className="hero-text">
          A small app to add, edit, and delete expenses with a simple React and Express setup.
        </p>
      </header>

      <main className="main-content">
        <section className="summary-grid">
          <article className="summary-card">
            <span>Total spent</span>
            <strong>{formatCurrency(totalAmount)}</strong>
          </article>
          <article className="summary-card">
            <span>Total records</span>
            <strong>{expenseCount}</strong>
          </article>
          <article className="summary-card">
            <span>Average expense</span>
            <strong>{formatCurrency(averageExpense)}</strong>
          </article>
          <article className="summary-card">
            <span>Largest expense</span>
            <strong>{largestExpense ? formatCurrency(largestExpense.amount) : formatCurrency(0)}</strong>
          </article>
        </section>

        {message ? <p className="success-banner">{message}</p> : null}
        {error ? <p className="error-banner">{error}</p> : null}

        <section className="content-grid">
          <ExpenseForm
            selectedExpense={selectedExpense}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />

          {loading ? (
            <section className="panel">
              <p className="loading-text">Loading expenses...</p>
            </section>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              formatCurrency={formatCurrency}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
