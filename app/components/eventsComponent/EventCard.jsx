import { Feather, MaterialIcons } from '@expo/vector-icons'; // Assuming you use Expo for icons
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  darkGrey: '#2E3A40',
  mediumGrey: '#455159',
  mintGreen: '#50C898',
  lightGrey: '#F0F0F0',
  white: '#FFFFFF',
  progressBlue: '#4A90E2', // From the image
};

const EventCard = ({ eventData }) => {
  const {
    title,
    date,
    location,
    status,
    attendees,
    tasksCompleted,
    tasksTotal,
    budget,
    progress,
    team,
  } = eventData;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEF0E7' }]}>
            <Feather name="edit-2" size={16} color="#F57C00" />
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#E9F3FF' }]}>
            <MaterialIcons name="bar-chart" size={16} color="#4A90E2" />
          </View>
          <View style={[styles.iconContainer, { backgroundColor: COLORS.lightGrey }]}>
            <Feather name="more-horizontal" size={16} color={COLORS.mediumGrey} />
          </View>
        </View>
      </View>

      {/* Location & Status */}
      <View style={styles.locationContainer}>
        <Feather name="map-pin" size={16} color="#D0021B" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status.toUpperCase()}</Text>
      </View>

      <View style={styles.divider} />

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Feather name="users" size={20} color={COLORS.mediumGrey} />
          <Text style={styles.statValue}>{attendees}</Text>
          <Text style={styles.statLabel}>Attendees</Text>
        </View>
        <View style={styles.stat}>
           <View style={styles.taskCheck}>
             <Feather name="check" size={12} color={COLORS.white} />
           </View>
          <Text style={styles.statValue}>{`${tasksCompleted}/${tasksTotal}`}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.stat}>
            <Text style={styles.budgetIcon}>💰</Text>
          <Text style={styles.statValue}>{`$${budget}K`}</Text>
          <Text style={styles.statLabel}>Budget</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{`${progress}% Complete`}</Text>
      </View>

      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.teamContainer}>
          {team.slice(0, 3).map((member, index) => (
            <View key={index} style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}>
              <Text style={styles.avatarText}>{member}</Text>
            </View>
          ))}
          {team.length > 3 && (
            <View style={[styles.avatar, styles.moreAvatar, { marginLeft: -10 }]}>
              <Text style={styles.avatarText}>{`+${team.length - 3}`}</Text>
            </View>
          )}
        </View>
        <Text style={styles.teamText}>{`${team.length} team members`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
  date: {
    fontSize: 16,
    color: COLORS.progressBlue,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.mediumGrey,
    marginLeft: 8,
  },
  statusContainer: {
    backgroundColor: '#E7F8F0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  statusText: {
    color: COLORS.mintGreen,
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.mediumGrey,
    marginLeft: 4,
  },
  taskCheck: {
    backgroundColor: COLORS.mintGreen,
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetIcon: {
      fontSize: 18,
  },
  progressContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.progressBlue,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.mediumGrey,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  moreAvatar: {
      backgroundColor: COLORS.mediumGrey,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  teamText: {
    fontSize: 14,
    color: COLORS.mediumGrey,
  },
});

export default EventCard;