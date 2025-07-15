import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FILTERS = ['All Events', 'Active', 'Draft', 'Complete', 'MyEvents'];

const EventFilters = () => {
  const [activeFilter, setActiveFilter] = useState('All Events');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeButton,
            ]}
            onPress={() => setActiveFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },
  activeButton: {
    backgroundColor: '#3A7DFF',
    borderColor: '#3A7DFF',
  },
  filterText: {
    color: '#8A9BAD',
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
  },
});

export default EventFilters;