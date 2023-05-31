import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/AppContext';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const appContext = useContext(AppContext);
  const { expenses, setExpenses } = appContext;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const tempExpenses = await fetchExpenses();
        setExpenses(tempExpenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
