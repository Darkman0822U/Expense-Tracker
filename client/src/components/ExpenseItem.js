function ExpenseItem({ expense, onEdit, onDelete, formatCurrency }) {
  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <li className="expense-item">
      <div className="expense-item-main">
        <div>
          <h3>{expense.title}</h3>
          <p className="expense-meta">
            {expense.category} • {formattedDate}
          </p>
        </div>

        <p className="expense-amount">{formatCurrency(expense.amount)}</p>
      </div>

      {expense.note ? <p className="expense-note">{expense.note}</p> : null}

      <div className="expense-actions">
        <button type="button" className="secondary-button small-button" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button type="button" className="danger-button small-button" onClick={() => onDelete(expense._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
