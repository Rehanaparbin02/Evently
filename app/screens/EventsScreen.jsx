import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EventCard from '../components/eventsComponent/EventCard'; // Adjust the path to your component

const EventsScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <EventCard eventData={eventData} />
      <EventCard eventData={eventData} /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#453C67', // Using the light grey from the palette for the background
  },
});

export default EventsScreen;