import React, { useContext } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import { AppContext } from '../../context/AppContext';

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length !== 0 && <ExpensesList expenses={expenses} />}

      {expenses.length === 0 && (
        <View style={styles.noExpensesContainer}>
          <Text style={styles.text}>No Expenses Available...</Text>
        </View>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    backgroundColor: GlobalStyles.colors.gray200,
  },
  noExpensesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: GlobalStyles.colors.primary200,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
});
