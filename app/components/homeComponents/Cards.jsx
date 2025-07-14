import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const Card = ({ number, description, monthlyChange, icon, color = '#6C5CE7', progress = 0.7 }) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);
    const rotateZ = useSharedValue(0);

    React.useEffect(() => {
        // Staggered entrance animation
        opacity.value = withDelay(100, withTiming(1, {
            duration: 800,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }));
        translateY.value = withDelay(100, withSpring(0, {
            damping: 20,
            stiffness: 100,
        }));
        rotateZ.value = withDelay(200, withSpring(0, {
            damping: 15,
            stiffness: 120,
        }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateY: translateY.value },
                { rotateZ: `${rotateZ.value}deg` }
            ],
            opacity: opacity.value,
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
        });
    };

    const getIconName = (iconType) => {
        const iconMap = {
            calendar: 'calendar',
            clipboard: 'document-text',
            wallet: 'wallet',
            people: 'people',
            stats: 'trending-up',
            heart: 'heart',
            star: 'star',
        };
        return iconMap[iconType] || 'analytics';
    };

    return (
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                style={styles.touchableCard}
            >
                <LinearGradient
                    colors={[color, color]} // Solid color instead of gradient for a cleaner look
                    style={styles.cardBackground}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconCircle}>
                            <Ionicons name={getIconName(icon)} size={24} color={color} />
                        </View>
                        {monthlyChange && (
                            <LinearGradient
                                colors={['#28a745', '#218838']} // Green for positive change
                                style={styles.trendGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons name="trending-up" size={12} color="white" />
                                <Text style={styles.trendText}>{monthlyChange}</Text>
                            </LinearGradient>
                        )}
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.numberText}>{number}</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        {/* Progress Bar */}
                        {progress !== undefined && (
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
                                    <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: 'white' }]} />
                                </View>
                                <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
                            </View>
                        )}
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
    },
    touchableCard: {
        flex: 1,
    },
    cardBackground: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white', // Solid white background for icon
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    trendGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 15,
        position:'relative',
        top:-10,
        right:-8,
    },
    trendText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 4,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-end', // Align content to bottom
    },
    numberText: {
        fontSize: 32,
        fontWeight: '900',
        color: 'white',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    descriptionText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
        marginBottom: 12,
        lineHeight: 18,
    },
    cardFooter: {
        marginTop: 10, // Add some space from content
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBar: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 12,
        backgroundColor: 'rgba(255,255,255,0.3)', // Lighter background for the bar
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: 'white', // Solid white fill
    },
    progressText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
    },
});

export default Card;