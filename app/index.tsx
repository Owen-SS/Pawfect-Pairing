import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BreedList from '../components/Cards';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BreedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
