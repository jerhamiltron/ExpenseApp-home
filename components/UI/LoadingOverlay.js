import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const LoadingOverlay = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={GlobalStyles.colors.primary400} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray300,
  },
});
