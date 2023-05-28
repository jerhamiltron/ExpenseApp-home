import React, { useContext } from 'react';

import { AppContext } from '../context/AppContext';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const appContext = useContext(AppContext);
  const expenses = appContext.expenses;

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days' />
  );
};

export default RecentExpenses;
