import axios from "axios";

const BACKEND_URL = "https://expenseapp-c076f-default-rtdb.firebaseio.com";

export const storeExpense = async (expense) => {
  const response = await axios.post(BACKEND_URL + "/expenses.json", expense);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};
