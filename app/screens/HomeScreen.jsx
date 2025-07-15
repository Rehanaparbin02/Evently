import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Card from '../components/homeComponents/Cards';
import Header from '../components/homeComponents/Header';
import QuickActions from '../components/homeComponents/QuickActions';
import RecentActivity from '../components/homeComponents/RecentActivity';
import UpcomingDeadlines from '../components/homeComponents/UpcomingDeadlines';
import WeatherCard from '../components/homeComponents/WeatherCard';
import useWeather from '../hooks/WeatherHook'; // Updated to use GPS-based version

const { width } = Dimensions.get('window');

const AnimatedCard = ({ card, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withDelay(
      index * 80,
      withTiming(1, { duration: 800, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    );
    translateY.value = withDelay(
      index * 80,
      withSpring(0, { damping: 15, stiffness: 150 })
    );
    scale.value = withDelay(
      index * 80,
      withSpring(1, { damping: 15, stiffness: 150 })
    );
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.cardWrapper, cardAnimatedStyle]}>
      <Card {...card} />
    </Animated.View>
  );
};

const HomeScreen = ({ navigation }) => {
  const WEATHER_API_KEY = '238026c92824a157659a0a2b341f40bf';

  const {
    loadingWeather,
    weatherError,
    temperature,
    customWeatherDescription,
    weatherIcon,
    cityName,
    minTemp,
    maxTemp
  } = useWeather(WEATHER_API_KEY); // ✅ using location-based weather

  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const dashboardOpacity = useSharedValue(0);
  const dashboardTranslateY = useSharedValue(50);
  const quickActionsOpacity = useSharedValue(0);
  const quickActionsTranslateY = useSharedValue(50);

  useEffect(() => {
    dashboardOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    );
    dashboardTranslateY.value = withDelay(
      300,
      withSpring(0, { damping: 15, stiffness: 150 })
    );

    quickActionsOpacity.value = withDelay(
      400,
      withTiming(1, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    );
    quickActionsTranslateY.value = withDelay(
      400,
      withSpring(0, { damping: 15, stiffness: 150 })
    );
  }, []);

  const dashboardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dashboardOpacity.value,
    transform: [{ translateY: dashboardTranslateY.value }],
  }));

  const quickActionsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: quickActionsOpacity.value,
    transform: [{ translateY: quickActionsTranslateY.value }],
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerOpacity.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [1, 0],
        Easing.linear
      );
    },
    onBeginDrag: () => {
      runOnJS(setIsScrolling)(true);
    },
    onEndDrag: () => {
      runOnJS(setIsScrolling)(false);
    },
  });

  const dashboardCards = [
    {
      number: "$1.2K",
      description: "This Week",
      monthlyChange: "+15% this week",
      icon: "calendar",
      color: "#FF6B6B",
    },
    {
      number: "250",
      description: "Tasks Done",
      monthlyChange: "+10 this month",
      icon: "clipboard",
      color: "#4ECDC4",
    },
    {
      number: "$12.5K",
      description: "Budget Used",
      monthlyChange: "75% of total",
      icon: "wallet",
      color: "#45B7D1",
      progress: 0.75,
    },
    {
      number: "8",
      description: "Team Members",
      monthlyChange: "+2 this month",
      icon: "people",
      color: "#F7CD46",
    },
  ];
    const recentActivities = [
  {
    title: 'New Attendee Registered',
    icon: 'person-add-outline',
    time: 'Today, 9:45 AM',
    amount: 0,
  },
  {
    title: 'Venue Booking Confirmed',
    icon: 'business-outline',
    time: 'Yesterday, 4:30 PM',
    amount: -12000,
  },
  {
    title: 'Catering Invoice Paid',
    icon: 'restaurant-outline',
    time: 'Yesterday, 1:15 PM',
    amount: -8000,
  },
  {
    title: 'Ticket Sale: John Doe',
    icon: 'ticket-outline',
    time: '2 days ago, 11:00 AM',
    amount: 1500,
  },
  {
    title: 'Lighting Vendor Advance Paid',
    icon: 'bulb-outline',
    time: '3 days ago, 6:45 PM',
    amount: -5000,
  },
  {
    title: 'New Sponsor Added: Zento Corp',
    icon: 'ribbon-outline',
    time: '4 days ago, 12:10 PM',
    amount: 0,
  },
];
const deadlines = [
  {
    title: 'Pay Catering Vendor',
    icon: 'restaurant-outline',
    date: 'Jul 16',
    time: '5:00 PM',
    urgent: true,
  },
  {
    title: 'Finalize Stage Design',
    icon: 'color-palette-outline',
    date: 'Jul 17',
    time: '3:00 PM',
  },
  {
    title: 'Social Media Campaign Launch',
    icon: 'logo-instagram',
    date: 'Jul 18',
    time: '9:00 AM',
  },
  {
    title: 'Confirm Guest Speakers',
    icon: 'mic-outline',
    date: 'Jul 19',
    time: '11:00 AM',
  },
];

  return (
    <LinearGradient colors={['#6A5ACD', '#483D8B']} style={styles.gradientBackground}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <Header navigation={navigation} />
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.dashboardContainer, dashboardAnimatedStyle]}>
            <View style={styles.cardsContainer}>
              {dashboardCards.map((card, index) => (
                <AnimatedCard key={card.number + index} card={card} index={index} />
              ))}
            </View>
          </Animated.View>

          {loadingWeather ? (
            <View style={styles.weatherCardPlaceholder}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Fetching Weather...</Text>
            </View>
          ) : weatherError ? (
            <View style={styles.weatherCardPlaceholder}>
              <Ionicons name="warning-outline" size={30} color="#fff" />
              <Text style={styles.loadingText}>Weather Unavailable</Text>
              <Text style={styles.errorText}>{weatherError}</Text>
            </View>
          ) : (
            <WeatherCard
              temperature={temperature}
              description={customWeatherDescription}
              iconName={weatherIcon}
              cityName={cityName}
              minTemp={minTemp ? `${minTemp}°` : '--°'}
              maxTemp={maxTemp ? `${maxTemp}°` : '--°'}
              hourlyForecast={[]} // You can add actual forecast data here later
              dailyForecast={[]}
            />
          )}

          <Animated.View style={quickActionsAnimatedStyle}>
            <QuickActions />
          </Animated.View>
          <RecentActivity
            activities={recentActivities}
            onSeeAll={() => navigation.navigate('AllActivity')}
            />
           <UpcomingDeadlines
                deadlines={deadlines}
                onViewAll={() => navigation.navigate('AllDeadlinesScreen')}
            />
        </Animated.ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Space for bottom tab (adjust if needed)
    },

    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    dashboardContainer: {
        marginTop: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    cardWrapper: {
        width: (width - 48) / 2,
        marginBottom: 16,
    },
    weatherCardPlaceholder: {
        backgroundColor: '#7B68EE',
        borderRadius: 15,
        padding: 20,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
    },
    });

export default HomeScreen;
