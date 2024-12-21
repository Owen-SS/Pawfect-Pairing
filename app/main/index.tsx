import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BreedList from '../../components/Cards';
import { SystemBars } from "react-native-edge-to-edge";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
    <SystemBars style="auto" />
      <SafeAreaView style={styles.container}>
        <BreedList />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});