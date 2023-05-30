import React, { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";

import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const appContext = useContext(AppContext);
  const { expenses, setExpenses } = appContext;

  useEffect(() => {
    const getExpenses = async () => {
      const tempExpenses = await fetchExpenses();
      setExpenses(tempExpenses);
    };

    getExpenses();
  }, []);

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
