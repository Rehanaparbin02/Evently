import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UpcomingDeadlines = ({ deadlines = [], onViewAll }) => {
  const renderItem = ({ item, index }) => (
    <View>
      <View style={styles.deadlineItem}>
        <View style={styles.iconCircle}>
          <Ionicons name={item.icon} size={20} color="#fff" />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.date} • {item.time}</Text>
        </View>
        <Text style={[styles.status, item.urgent && styles.urgent]}>
          {item.urgent ? 'URGENT' : 'Upcoming'}
        </Text>
      </View>
      {index < deadlines.length - 1 && <View style={styles.divider} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Upcoming Deadlines</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {deadlines.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming deadlines</Text>
      ) : (
        <FlatList
          data={deadlines.slice(0, 5)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#6A5ACD',
    fontWeight: '600',
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 2,
    marginLeft: 40, // aligns under the title and subtitle
  },
  iconCircle: {
    backgroundColor: '#6A5ACD',
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6A5ACD',
  },
  urgent: {
    color: '#FF3B30',
  },
  emptyText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default UpcomingDeadlines;
