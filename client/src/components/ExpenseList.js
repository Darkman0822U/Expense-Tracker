import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete, formatCurrency }) {
  if (expenses.length === 0) {
    return (
      <section className="panel">
        <div className="empty-state">
          <h2>No expenses yet</h2>
          <p>Add your first expense using the form on the left.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Recent expenses</p>
          <h2>Expense list</h2>
        </div>
      </div>

      <ul className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
            formatCurrency={formatCurrency}
          />
        ))}
      </ul>
    </section>
  );
}

export default ExpenseList;
