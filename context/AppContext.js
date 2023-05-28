import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of pants',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some groceries',
    amount: 18.59,
    date: new Date('2021-12-23'),
  },
  {
    id: 'e4',
    description: 'Xbox Series X',
    amount: 380.005,
    date: new Date('2021-12-28'),
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 19.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of pants',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e8',
    description: 'Some groceries',
    amount: 18.59,
    date: new Date('2021-12-23'),
  },
  {
    id: 'e9',
    description: 'Xbox Series X',
    amount: 380.005,
    date: new Date('2021-12-28'),
  },
  {
    id: 'e10',
    description: 'Udemy Course',
    amount: 89.0,
    date: new Date('2023-05-25'),
  },
];

export const AppContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const tempExpense = state[expenseIndex];
      const updatedExpense = { ...tempExpense, ...action.payload.data };

      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;

      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(appReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
