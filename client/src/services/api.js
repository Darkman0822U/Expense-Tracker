const API_ORIGIN = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
const API_BASE_URL = `${API_ORIGIN}/api/expenses`;

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed.');
  }

  return data;
}

export function getExpenses() {
  return request().then((data) => {
    if (!Array.isArray(data)) {
      throw new Error('The API returned an invalid expenses response.');
    }

    return data;
  });
}

export function createExpense(expenseData) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(expenseData)
  });
}

export function updateExpense(id, expenseData) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expenseData)
  });
}

export function deleteExpense(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}
