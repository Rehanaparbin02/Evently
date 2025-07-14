import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const WeatherCard = ({ 
  temperature, 
  description, 
  iconName, 
  cityName, 
  minTemp, 
  maxTemp,
  hourlyForecast = [],
  dailyForecast = []
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const cardScale = useSharedValue(0.9);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    cardScale.value = withDelay(200, withSpring(1, {
      damping: 15,
      stiffness: 100,
    }));
    cardOpacity.value = withDelay(200, withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }));
    
    return () => clearInterval(timeInterval);
  }, []);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
      opacity: cardOpacity.value,
    };
  });

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  const getWeatherIcon = (desc, defaultIcon = 'partly-sunny') => {
    if (!desc) return defaultIcon;
    const lowerDesc = desc.toLowerCase();
    
    const iconMap = {
      'clear': 'sunny',
      'sunny': 'sunny',
      'partly cloudy': 'partly-sunny',
      'cloudy': 'cloudy',
      'overcast': 'cloudy',
      'rain': 'rainy',
      'drizzle': 'rainy',
      'shower': 'rainy',
      'snow': 'snow',
      'sleet': 'snow',
      'thunderstorm': 'thunderstorm',
      'thunder': 'thunderstorm',
      'mist': 'cloudy',
      'fog': 'cloudy',
      'haze': 'cloudy',
      'windy': 'cloudy'
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerDesc.includes(key)) return icon;
    }
    
    return defaultIcon;
  };

  const getGradientColors = (desc) => {
    if (!desc) return ['#4A90E2', '#5DADE2'];

    const lowerDesc = desc.toLowerCase();
    
    if (lowerDesc.includes('clear') || lowerDesc.includes('sunny')) {
      return ['#4A90E2', '#5DADE2'];
    } else if (lowerDesc.includes('cloud')) {
      return ['#A9B7C0', '#8899A6'];
    } else if (lowerDesc.includes('rain') || lowerDesc.includes('drizzle')) {
      return ['#54717A', '#3C4D52'];
    } else if (lowerDesc.includes('snow')) {
      return ['#E0E7E9', '#BDC3C7'];
    } else if (lowerDesc.includes('thunder')) {
      return ['#625368', '#423B45'];
    } else {
      return ['#4A90E2', '#5DADE2'];
    }
  };

  const defaultDailyForecast = [
    { day: 'TUE', icon: 'partly-sunny', high: '28°', low: '18°' },
    { day: 'WED', icon: 'cloudy', high: '25°', low: '16°' },
    { day: 'THU', icon: 'rainy', high: '22°', low: '14°' },
    { day: 'FRI', icon: 'sunny', high: '30°', low: '20°' },
  ];

  return (
    <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
      <LinearGradient
        colors={getGradientColors(description)}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.infoSection}>
          <View style={styles.leftSide}>
            <Text style={styles.temperature}>{temperature}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.minMaxTemp}>
              <Ionicons name="thermometer-outline" size={14} color="white" />
              <Text style={styles.minMaxText}>Min: {minTemp}</Text>
              <Text style={styles.minMaxText}>Max: {maxTemp}</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
           <Ionicons
              name={
                Ionicons.glyphMap[iconName]
                  ? iconName
                  : getWeatherIcon(description) in Ionicons.glyphMap
                    ? getWeatherIcon(description)
                    : 'partly-sunny'
              }
              size={60}
              color="white"
            />

            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="white" />
              <Text style={styles.city}>{cityName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.forecastSection}>
          <View style={styles.forecastContainer}>
            {(dailyForecast.length > 0 ? dailyForecast : defaultDailyForecast).map((item, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Ionicons name={getWeatherIcon(item.icon)} size={24} color="white" />
                <Text style={styles.tempText}>{item.high}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: screenWidth - 32,
    height: 190, // 🟢 Fixed: Reduced from 250 to 190
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  leftSide: {
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 12,
    color: 'white',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  minMaxTemp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  minMaxText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  rightSide: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 8,
  },
  city: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginLeft: 6,
    maxWidth: 100,
  },
  forecastSection: {
    height: 60, // 🟢 Slightly reduced from 70
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 0,
    overflow: 'hidden',
    marginTop: 'auto',
  },
  forecastContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  forecastItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  tempText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default WeatherCard;
