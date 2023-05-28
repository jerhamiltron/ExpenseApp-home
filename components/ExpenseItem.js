import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../constants/styles';
import { getFormattedDate } from '../util/date';

const ExpenseItem = ({ id, description, amount, date }) => {
  //   const { description, amount, date } = data.item;
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      //   style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{
        color: GlobalStyles.colors.gray300,
        foreground: true,
      }}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 6,
    borderRadius: 8,
    padding: 12,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ translateX: -6 }],
  },
  textBase: {
    fontSize: 14,
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    width: 80,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
  },
});
