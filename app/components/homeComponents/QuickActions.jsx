import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// ActionButton component for individual quick actions
const ActionButton = ({ action, onPress, delay, isFirst, isLast }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    React.useEffect(() => {
        scale.value = withDelay(delay, withSpring(1, {
            damping: 12,
            stiffness: 150,
        }));
        opacity.value = withDelay(delay, withTiming(1, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }));
        translateY.value = withDelay(delay, withSpring(0, {
            damping: 12,
            stiffness: 150,
        }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { translateY: translateY.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[
            styles.actionButton,
            animatedStyle,
            isFirst && styles.firstAction,
            isLast && styles.lastAction
        ]}>
            <TouchableOpacity 
                onPress={onPress} 
                activeOpacity={0.8}
            >
                <View style={styles.buttonBackground}>
                    <View style={styles.iconWrapper}>
                        <LinearGradient
                            colors={action.gradientColors}
                            style={styles.iconGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name={action.icon} size={24} color="white" />
                        </LinearGradient>
                    </View>
                    <Text style={styles.actionText} numberOfLines={1}>
                        {action.text}
                    </Text>
                    <View style={[styles.accentLine, { backgroundColor: action.color }]} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const QuickActions = () => {
    const actions = [
        { 
            id: '1', 
            icon: 'calendar-outline', 
            text: 'New Event', 
            color: '#FF6B6B',
            gradientColors: ['#FF6B6B', '#FF8E8E'],
        },
        { 
            id: '2', 
            icon: 'checkmark-circle-outline', 
            text: 'Add Task', 
            color: '#4ECDC4',
            gradientColors: ['#4ECDC4', '#6BD4C8'],
        },
        { 
            id: '3', 
            icon: 'people-outline', 
            text: 'Invite Team', 
            color: '#45B7D1',
            gradientColors: ['#45B7D1', '#6BC5D5'],
        },
        { 
            id: '4', 
            icon: 'cash-outline', 
            text: 'Expense', 
            color: '#96CEB4',
            gradientColors: ['#96CEB4', '#A8D5C0'],
        },
        { 
            id: '5', 
            icon: 'notifications-outline', 
            text: 'Remind Me', 
            color: '#F7DC6F',
            gradientColors: ['#F7DC6F', '#F9E79F'],
        },
        { 
            id: '6', 
            icon: 'document-text-outline', 
            text: 'New Note', 
            color: '#BB8FCE',
            gradientColors: ['#BB8FCE', '#C8A2DB'],
        },
    ];

    const handleActionPress = (actionText) => {
        console.log(`Action pressed: ${actionText}`);
        // Add haptic feedback and navigation logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Quick Actions</Text>
                {/* <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Ionicons name="chevron-forward" size={16} color="white" />
                </TouchableOpacity> */}
            </View>
            
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                decelerationRate="fast"
                snapToInterval={100}
            >
                {actions.map((action, index) => (
                    <ActionButton
                        key={action.id}
                        action={action}
                        onPress={() => handleActionPress(action.text)}
                        delay={index * 80}
                        isFirst={index === 0}
                        isLast={index === actions.length - 1}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    // viewAllButton: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingVertical: 5,
    //     paddingHorizontal: 10,
    //     borderRadius: 15,
    //     backgroundColor: 'rgba(255,255,255,0.2)', // Subtle background
    // },
    // viewAllText: {
    //     fontSize: 14,
    //     color: 'white',
    //     marginRight: 4,
    //     fontWeight: '600',
    // },
    scrollContainer: {
        paddingHorizontal: 5, // Add horizontal padding for the scroll view
    },
    actionButton: {
        marginRight: 15, // Spacing between buttons
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 18,
    },
    firstAction: {
        marginLeft: 0, // No left margin for the first item
    },
    lastAction: {
        marginRight: 0, // No right margin for the last item
    },
    buttonBackground: {
        width: 90, // Increased width
        height: 100,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF', // Solid white background
        position: 'relative',
    },
    iconWrapper: {
        marginBottom: 8,
    },
    iconGradient: {
        width: 50, // Larger icon size
        height: 50,
        borderRadius: 25, // Half of width/height for a circle
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginTop: 4,
    },
    accentLine: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 4,
        borderRadius: 2,
        opacity: 0.7,
    },
});

export default QuickActions;