import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Button from '../UI/Button';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  expenseData,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: expenseData ? expenseData.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: expenseData ? expenseData.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: expenseData ? expenseData.description : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (inputId, inputValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputId]: { value: inputValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(`${inputs.date.value}`),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) & (expenseData.amount > 0);
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert('Invalid Input', 'Please check the errors in the form.');
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const invalidForm =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.subContainer}>
          <Input
            style={styles.rowInput}
            label='Amount'
            invalid={!inputs.amount.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangeHandler.bind(this, 'amount'),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={styles.rowInput}
            placeholder={inputs.date}
            label='Date'
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              keyboardType: 'default',
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, 'date'),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label='Description'
          invalid={!inputs.description.isValid}
          placeholder={[inputs.description]}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value,
            multiline: true,
            //   autoCorrect: false, // default is true
          }}
        />
      </View>

      {invalidForm && (
        <Text style={styles.errorText}>
          Error in the form. See highlighted text!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },

  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowInput: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  error: {
    backgroundColor: GlobalStyles.colors.error50,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
