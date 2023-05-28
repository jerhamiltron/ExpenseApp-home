import axios from 'axios';

export const storeExpense = (expense) => {
  axios.post(
    'https://expenseapp-c076f-default-rtdb.firebaseio.com/expenses.json',
    expense
  );
};
