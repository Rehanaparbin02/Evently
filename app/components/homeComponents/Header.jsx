import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing functions
const wp = (percentage) => (screenWidth * percentage) / 100;
const hp = (percentage) => (screenHeight * percentage) / 100;
const scale = (size) => (screenWidth / 320) * size; // Base scale for iPhone 5

const Header = ({ navigation }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState('');

    const getDynamicGreeting = (date) => {
        const hour = date.getHours();
        let timeOfDay = '';
        let emoji = '';

        if (hour >= 5 && hour < 12) {
            timeOfDay = 'Good Morning';
            emoji = '🌅';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'Good Afternoon';
            emoji = '☀️';
        } else if (hour >= 17 && hour < 20) {
            timeOfDay = 'Good Evening';
            emoji = '🌆';
        } else {
            timeOfDay = 'Good Night';
            emoji = '🌙';
        }

        return { greeting: `${timeOfDay}, Alex!`, emoji };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setGreeting(getDynamicGreeting(now));
        }, 60000);

        setGreeting(getDynamicGreeting(new Date()));
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) =>
        date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

    const formatDate = (date) =>
        date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });

    const AnimatedButton = ({ iconName, size = scale(24), onPress, style, isProfile = false }) => {
        const scale = useSharedValue(1);
        const rotate = useSharedValue(0);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
                { scale: scale.value },
                { rotate: `${rotate.value}deg` }
            ]
        }));

        const handlePressIn = () => {
            scale.value = withSpring(0.85, {
                damping: 15,
                stiffness: 300
            });
            if (iconName === 'settings-outline') {
                rotate.value = withSpring(90, {
                    damping: 15,
                    stiffness: 300
                });
            }
        };

        const handlePressOut = () => {
            scale.value = withSpring(1, {
                damping: 15,
                stiffness: 300
            });
            if (iconName === 'settings-outline') {
                rotate.value = withSpring(0, {
                    damping: 15,
                    stiffness: 300
                });
            }
        };

        return (
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                android_ripple={{ color: '#ddd', borderless: true }}
                style={({ pressed }) => [
                    styles.iconButton,
                    style,
                    pressed && Platform.OS === 'ios' && { opacity: 0.75 }
                ]}
            >
                <Animated.View style={animatedStyle}>
                    {isProfile ? (
                        <LinearGradient
                            colors={['#FFD700', '#FFA500']}
                            style={styles.profileGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="person" size={size} color="white" />
                        </LinearGradient>
                    ) : (
                        <View style={styles.iconBackground}>
                            <Ionicons name={iconName} size={size} color="#483D8B" />
                        </View>
                    )}
                </Animated.View>
            </Pressable>
        );
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingEmoji}>{greeting.emoji}</Text>
                    <Text style={styles.greetingText} numberOfLines={1} adjustsFontSizeToFit>
                        {greeting.greeting}
                    </Text>
                </View>
                <View style={styles.timeContainer}>
                    <View style={styles.timeIcon}>
                        <Ionicons name="time-outline" size={scale(10)} color="white" />
                    </View>
                    <Text style={styles.timeText} numberOfLines={1} adjustsFontSizeToFit>
                        {formatTime(currentTime)} · {formatDate(currentTime)}
                    </Text>
                </View>
            </View>

            <View style={styles.headerRight}>
                <View style={styles.actionButtons}>
                    <AnimatedButton 
                        iconName="notifications-outline" 
                        size={scale(18)}
                        onPress={() => console.log('Notifications')} 
                    />
                    <AnimatedButton 
                        iconName="settings-outline" 
                        size={scale(18)}
                        onPress={() => console.log('Settings')} 
                    />
                </View>
                <AnimatedButton 
                    iconName="person-circle-outline" 
                    size={scale(18)}
                    onPress={() => console.log('Profile')} 
                    isProfile 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        marginBottom: hp(-2),
        backgroundColor: '#ADD8E6',
        borderRadius: scale(20),
        marginHorizontal: wp(3),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        minHeight: hp(8),
        maxWidth: wp(94), // Prevent overflow
        alignSelf: 'center',
        position: 'relative',
        top: hp(-3),
    },
    headerLeft: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        paddingRight: wp(1),
        minWidth: 0, // Allow shrinking
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
        width: '100%',
    },
    greetingEmoji: {
        fontSize: scale(20),
        marginRight: wp(1.5),
        minWidth: scale(25), // Ensure consistent spacing
    },
    greetingText: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#483D8B',
        flex: 1,
        minHeight: scale(22), // Prevent text jumping
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    timeIcon: {
        width: scale(18),
        height: scale(18),
        borderRadius: scale(9),
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1.5),
    },
    timeText: {
        fontSize: scale(12),
        fontWeight: '600',
        color: '#483D8B',
        flex: 1,
        minHeight: scale(16), // Prevent text jumping
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexShrink: 0, // Prevent shrinking
    },
    actionButtons: {
        position:'relative',
        top:hp(0.5),
        right: -5,
        flexDirection: 'row',
        marginRight: wp(0.5),
    },
    iconButton: {
        width: scale(35),
        height: scale(35),
        borderRadius: scale(18),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(0.28),
    },
    iconBackground: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileGradient: {
        position:'relative',
        top:hp(0.5),
        right: -5,
        width: scale(30),
        height: scale(30),
        borderRadius: scale(17),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
});

export default Header;