import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StatCard = ({ count, label }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  count: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A7DFF',
  },
  label: {
    fontSize: 14,
    color: '#8A9BAD',
    marginTop: 4,
  },
});

export default StatCard;