import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeableCards from '../../components/SwipeableCards';
import { SystemBars } from "react-native-edge-to-edge";

export default function App() {
  return (
    <View style={styles.fullScreen}>
      <SystemBars style="dark" />
      <SwipeableCards>
      </SwipeableCards>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: "center",
  },
});