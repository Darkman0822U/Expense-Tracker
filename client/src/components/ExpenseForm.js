import { useEffect, useState } from 'react';

const categoryOptions = [
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Health',
  'Entertainment',
  'Other'
]

const getTodayValue = () => {
  return new Date().toISOString().split('T')[0];
};

function ExpenseForm({ selectedExpense, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayValue());
  const [note, setNote] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (selectedExpense) {
      setTitle(selectedExpense.title || '');
      setAmount(selectedExpense.amount?.toString() || '');
      setCategory(selectedExpense.category || 'Food');
      setDate(selectedExpense.date ? new Date(selectedExpense.date).toISOString().split('T')[0] : getTodayValue());
      setNote(selectedExpense.note || '');
      setFormError('');
      return;
    }

    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(getTodayValue());
    setNote('');
    setFormError('');
  }, [selectedExpense]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !amount || !category.trim() || !date) {
      setFormError('Please fill in the required fields.');
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
      note: note.trim()
    };

    await onSave(expenseData);
  };

  return (
    <section className="panel" id="expense-form">
      <div className="panel-header">
        <div>
          <p className="section-label">Expense form</p>
          <h2>{selectedExpense ? 'Edit expense' : 'Add new expense'}</h2>
        </div>
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-group">
            <span>Title *</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Grocery shopping"
            />
          </label>

          <label className="form-group">
            <span>Amount *</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
            />
          </label>

          <label className="form-group">
            <span>Category *</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            <span>Date *</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>

        <label className="form-group">
          <span>Note</span>
          <textarea
            rows="3"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional short note"
          />
        </label>

        {formError ? <p className="form-error">{formError}</p> : null}

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {selectedExpense ? 'Update expense' : 'Save expense'}
          </button>

          {selectedExpense ? (
            <button type="button" className="secondary-button" onClick={onCancel}>
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
