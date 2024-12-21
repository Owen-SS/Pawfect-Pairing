// Page.js
import React from 'react';
import SwipeableContainer from '../components/SwipeableContainer';
import { useRouter } from 'expo-router';
import { SystemBars } from "react-native-edge-to-edge";
import { View, StyleSheet } from 'react-native';

export default function Page() {
  const router = useRouter();

  const navigateToMain = () => {
    router.push('/main');
  };

  return (
    <View style={styles.fullScreen}>
      <SystemBars style="auto" />
      <SwipeableContainer navigateToMain={navigateToMain}>
      </SwipeableContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: "center",
  },
})