import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AllExpenses = () => {
  const appContext = useContext(AppContext);
  const expenses = appContext.expenses;

  return <ExpensesOutput expenses={expenses} expensesPeriod='Total' />;
};

export default AllExpenses;
