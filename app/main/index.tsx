import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeableCards from '../../components/SwipeableCards';
import { SystemBars } from "react-native-edge-to-edge";

export default function App() {
  return (
    <View style={styles.fullScreen}>
      <SystemBars style="auto" />
      <SwipeableCards>
      </SwipeableCards>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullScreen: {
    flex: 1,
    alignItems: "center",
  },
});