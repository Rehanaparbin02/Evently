// // import { createStackNavigator } from '@react-navigation/stack';
// // import React from 'react';
// // import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// // import TabNavigator from './TabNavigator'; // 👈 Contains Home, Events, Tasks, Team

// // const Stack = createStackNavigator();

// // export default function App() {
// //   return (
// //       <SafeAreaView style={styles.safeArea}>
// //         <Stack.Navigator screenOptions={{ headerShown: false }}>
// //           <Stack.Screen name="MainTabs" component={TabNavigator} />
// //           {/* Add other screens here if needed */}
// //         </Stack.Navigator>
// //       </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
// //     backgroundColor: '#7B68EE',
// //   },
// // });
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet
// } from 'react-native';

// import HomeScreen from '../HomeScreen';
// import EventsScreen from '../screens/EventsScreen';
// import TasksScreen from '../screens/TasksScreen';
// import TeamScreen from '../screens/TeamScreen';
// import TabNavigator from './TabNavigator'; // 👈 Contains FAB and screen nav

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={TabNavigator} />
//           <Stack.Screen name="EventsScreen" component={EventsScreen} />
//           <Stack.Screen name="TasksScreen" component={TasksScreen} />
//           <Stack.Screen name="TeamScreen" component={TeamScreen} />
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           {/* Add other screens like Settings, Details, etc. */}
//         </Stack.Navigator>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: '#7B68EE',
//   },
// });
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

import TabNavigator from './TabNavigator'; // 👈 Contains FAB and screen nav

export default function App() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <TabNavigator />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#7B68EE',
  },
});