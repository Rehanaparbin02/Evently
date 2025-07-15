import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

// Import all the components
import EventCard from '../components/eventsComponent/EventCard'; // Your existing component
import EventFilters from '../components/eventsComponent/EventFilters';
import Header from '../components/eventsComponent/EventHeader';
import SearchBar from '../components/eventsComponent/SearchBar';
import StatCard from '../components/eventsComponent/StatCard';

const EventsScreen = () => {
  // Mock data for the event card
  const eventData = {
    title: 'Tech Summit 2025',
    date: 'March 15-16, 2025',
    location: 'Convention Center, Mumbai',
    status: 'Active',
    attendees: 450,
    tasksCompleted: 12,
    tasksTotal: 18,
    budget: 8.5,
    progress: 67,
    team: ['A', 'S', 'M', 'J', 'K', 'L', 'P', 'Q'],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView>
        <View style={styles.statsRow}>
          <StatCard count="5" label="Active Events" />
          <StatCard count="2" label="Draft Events" />
          <StatCard count="12" label="Completed" />
        </View>
        <EventFilters />
        <SearchBar />
        
        {/* Placeholder for event list - showing one card for now */}
        <View style={styles.eventListContainer}>
          <EventCard eventData={eventData} />
          <EventCard eventData={eventData} />
          <EventCard eventData={eventData} />
          <EventCard eventData={eventData} />
          <EventCard eventData={eventData} />
          {/* You would typically map over a list of events here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#916BBF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 30, // Negative margin to pull it up into the header's curve
  },
  eventListContainer: {
      marginTop: 10,
  }
});

export default EventsScreen;