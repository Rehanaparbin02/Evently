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