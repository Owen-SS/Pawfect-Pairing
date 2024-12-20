import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from 'expo-router';
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

async function fetchFact() {
  try {
    const response = await fetch('https://dogapi.dog/api/v2/facts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data && data.data.length > 0 && data.data[0].attributes && data.data[0].attributes.body) {
      return data.data[0].attributes.body;
    } else {
      console.error("Invalid data format:", data);
      return "Could not retrieve a dog fact."; // Provide a fallback message
    }
  } catch (error) {
    console.error("Error fetching fact:", error);
    return "Failed to fetch dog fact."; // Provide a fallback message
  }
}

export default function Page() {
  const [fact, setFact] = useState("Loading dog fact..."); // Initial loading message
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // Add a flag to prevent setting state after unmount

    fetchFact().then(data => {
      if (isMounted) {
        setFact(data);
      }
    });

    return () => {
      isMounted = false; // Set flag to false on unmount
    };
  }, []);

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
  const navigateToMain = () => {
      router.push('/main')
  }
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
              {/* <Link href="/main">View details</Link>  The link does not work reliably when swiping*/}
            </View>

            <View style={styles.factBox}>
              <Text>{fact}</Text>
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
    alignItems: "center",
    padding: 24,
  },
  main: {
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
  factBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "whitesmoke",
  },
  panView: { 
    width: '100%',
    alignItems: 'center'
  }
});