import React, { useLayoutEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "./../constants/styles";
import { storeExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const appContext = useContext(AppContext);
  const { expenses, addExpense, updateExpense, deleteExpense } = appContext;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    navigation.goBack();
    deleteExpense(editedExpenseId);
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Expense</Text>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        expenseData={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteBtnContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={30}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray300,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
    textShadowColor: GlobalStyles.colors.primary200,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },

  deleteBtnContainer: {
    backgroundColor: GlobalStyles.colors.gray300,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.error500,
    alignItems: "center",
  },
});
