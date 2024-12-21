import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { SystemBars } from "react-native-edge-to-edge";

const { height } = Dimensions.get('window');

export default function SwipeableContainer({ navigateToMain }) {
  const translateX = useSharedValue(0);
  const startX = useRef(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        runOnJS(navigateToMain)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX.current;
    if (deltaX > 100) {
      navigateToMain();
    } else {
      translateX.value = withTiming(0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      navigateToMain();
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { height }]}>
        <SystemBars style="auto" />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[animatedStyles, styles.panView]}
            onTouchStart={Platform.OS === 'web' ? handleTouchStart : undefined}
            onTouchEnd={Platform.OS === 'web' ? handleTouchEnd : undefined}
          >
            <View style={styles.main}>
              <Text style={styles.title}>Pawfect Pairing</Text>
              <Text style={styles.subtitle}>Find your new best friend</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>←</Text>
              <Text style={styles.swipeText}>Swipe Left to Begin</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  panView: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrow: {
    fontSize: 30,
    marginRight: 10,
    color: '#000',
  },
  swipeText: {
    fontSize: 18,
    color: '#000',
  },
});