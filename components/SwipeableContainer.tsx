import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SystemBars } from "react-native-edge-to-edge";

export default function SwipeableContainer({ navigateToMain }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      const shouldNavigate = event.translationX > 100;
      if (shouldNavigate) {
        runOnJS(navigateToMain)();
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SystemBars style="auto" />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[animatedStyles, styles.panView]}>
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
