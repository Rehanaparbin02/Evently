// // components/EventHeader.jsx

// import { Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation
// import React from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// const EventHeader = () => {
//   const navigation = useNavigation(); // Get the navigation object

//   return (
//     <View style={styles.headerContainer}>
//       <SafeAreaView>
//         <View style={styles.headerContent}>
//           <View>
//             <Text style={styles.title}>Events</Text>
//             <Text style={styles.subtitle}>Manage your events & projects</Text>
//           </View>
//           <View style={styles.iconsContainer}>
//             <View style={styles.iconWrapper}>
//               <Feather name="search" size={20} color="white" onPress={() => {
//                 navigation.navigate('SearchScreen'); // Now navigation is available
//               }} />
//             </View>
//             <View style={styles.iconWrapper}>
//               <Feather name="bar-chart-2" size={20} color="white" />
//             </View>
//             <View style={styles.iconWrapper}>
//               <Feather name="settings" size={20} color="white" />
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: '#1C0C5B',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     paddingTop: 0,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#E0E8FF',
//     marginTop: 4,
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//   },
//   iconWrapper: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
// });

// export default EventHeader;

// components/EventHeader.jsx

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Accept onSearchPress as a prop
const EventHeader = ({ onSearchPress }) => {
  return (
    <View style={styles.headerContainer}>
      <SafeAreaView>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Events</Text>
            <Text style={styles.subtitle}>Manage your events & projects</Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.iconWrapper}>
              {/* Call onSearchPress when the search icon is pressed */}
              <Feather name="search" size={20} color="white" onPress={onSearchPress} />
            </View>
            <View style={styles.iconWrapper}>
              <Feather name="bar-chart-2" size={20} color="white" />
            </View>
            <View style={styles.iconWrapper}>
              <Feather name="settings" size={20} color="white" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1C0C5B',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E8FF',
    marginTop: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default EventHeader;