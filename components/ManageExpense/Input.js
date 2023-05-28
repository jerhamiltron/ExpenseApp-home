import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, textInputConfig, invalid }) => {
  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.errorText]}>{label}</Text>
      <TextInput
        style={[inputStyles, invalid && styles.errorInput]}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
    padding: 4,
  },
  input: {
    padding: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary800,
    backgroundColor: GlobalStyles.colors.gray100,
    borderColor: GlobalStyles.colors.gray500,
    borderWidth: 2,
    borderRadius: 6,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
