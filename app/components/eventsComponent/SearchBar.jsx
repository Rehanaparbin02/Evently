import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#8A9BAD" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search events, venues, or dates..."
        placeholderTextColor="#C0C8D1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#2E3A40',
  },
});

export default SearchBar;