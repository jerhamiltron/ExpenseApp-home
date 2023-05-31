import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={[styles.text, styles.title]}>You gots uh error</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray300,
  },

  text: {
    textAlign: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  message: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
