import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Screens
import HomeScreen from '../HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import TasksScreen from '../screens/TasksScreen';
import TeamScreen from '../screens/TeamScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('HomeScreen');
  const scaleAnim = useState(new Animated.Value(0))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];
  const rotateAnim = useState(new Animated.Value(0))[0];
  const translateYAnim = useState(new Animated.Value(30))[0];

  const toggleMenu = () => {
    if (menuOpen) {
      // Closing animation - faster and more responsive
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 30,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Opening animation - smoother with better easing
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setMenuOpen(prev => !prev);
  };

  const handleNavigation = (screenName) => {
    toggleMenu();
    setActiveTab(screenName);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'HomeScreen':
        return <HomeScreen />;
      case 'EventsScreen':
        return <EventsScreen />;
      case 'TasksScreen':
        return <TasksScreen />;
      case 'TeamScreen':
        return <TeamScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {/* Background Blur Overlay */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.backgroundBlur,
            {
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
              }),
            },
          ]}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      )}

      {/* FAB + Menu */}
      <View style={styles.fabContainer}>
        {menuOpen && (
          <Animated.View
            style={[
              styles.menuWrapper,
              {
                transform: [
                  { 
                    scale: scaleAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.3, 0.8, 1],
                    })
                  },
                  { translateY: translateYAnim },
                ],
                opacity: opacityAnim,
              },
            ]}
          >
            <View style={styles.solidMenu}>
              <View style={styles.menuContent}>
                {[
                  { label: 'Home', icon: 'home-outline', screenName: 'HomeScreen' },
                  { label: 'Events', icon: 'calendar-outline', screenName: 'EventsScreen' },
                  { label: 'Tasks', icon: 'checkmark-circle-outline', screenName: 'TasksScreen' },
                  { label: 'Team', icon: 'people-outline', screenName: 'TeamScreen' },
                ].map(({ label, icon, screenName }, index) => (
                  <Animated.View
                    key={label}
                    style={[
                      styles.menuItemWrapper,
                      {
                        transform: [
                          {
                            translateX: scaleAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [30, 0],
                            }),
                          },
                          {
                            scale: scaleAnim.interpolate({
                              inputRange: [0, 0.6, 1],
                              outputRange: [0.8, 0.95, 1],
                            }),
                          },
                        ],
                        opacity: scaleAnim.interpolate({
                          inputRange: [0, 0.4 + (index * 0.15), 1],
                          outputRange: [0, 0, 1],
                        }),
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.menuItem,
                        activeTab === screenName && styles.activeMenuItem
                      ]}
                      onPress={() => handleNavigation(screenName)}
                      activeOpacity={0.7}
                    >
                      <View style={[
                        styles.iconContainer,
                        activeTab === screenName && styles.activeIconContainer
                      ]}>
                        <Ionicons name={icon} size={20} color="#fff" />
                      </View>
                      <Text style={[
                        styles.menuLabel,
                        activeTab === screenName && styles.activeMenuLabel
                      ]}>
                        {label}
                      </Text>
                      {/* Active indicator dot */}
                      {activeTab === screenName && (
                        <View style={styles.activeIndicator} />
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        <TouchableOpacity
          style={[
            styles.fabButton,
            menuOpen && styles.fabButtonActive,
          ]}
          onPress={toggleMenu}
          activeOpacity={0.8}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '0deg'],
                  }),
                },
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 0.9, 1],
                  }),
                },
              ],
            }}
          >
            <Ionicons
              name={menuOpen ? 'close' : 'menu'}
              size={28}
              color="#fff"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 24,
    right: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 999,
  },
  fabButton: {
    width: 60,
    height: 60,
    backgroundColor: '#6A5ACD',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    transform: [{ scale: 1 }],
  },
  fabButtonActive: {
    backgroundColor: '#554791',
    elevation: 12,
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  menuWrapper: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  solidMenu: {
    backgroundColor: '#2D3748',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 12,
  },
  menuContent: {
    padding: 8,
    minWidth: 160,
  },
  menuItemWrapper: {
    marginBottom: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#4A5568',
    marginBottom: 8,
    position: 'relative',
  },
  activeMenuItem: {
    backgroundColor: '#0e0218ff', // Changed to a more vibrant blue
    borderWidth: 2,
    borderColor: '#ffffffff',
    shadowColor: '#ffffffff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6A5ACD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activeIconContainer: {
    backgroundColor: '#1E40AF', // Darker blue for active icon
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#1E40AF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  menuLabel: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
  activeMenuLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    elevation: 2,
  },
});

export default TabNavigator;