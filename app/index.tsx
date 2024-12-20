import { Animated, StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import { SystemBars } from "react-native-edge-to-edge";
import React, { useRef, useEffect , useState } from "react";


async function fetchFact() {
  const response = await fetch('https://dogapi.dog/api/v2/facts');
  const data = await response.json();
  let fact = data.data[0].attributes.body;
  return fact
}

const fadeAnim = useRef(new Animated.Value(0)).current

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 10000,
  useNativeDriver: true,
}).start();

const bounce = useRef(new Animated.ValueXY({x: 10, y: 450})).current;

export default function Page() {
  const [fact, setDogData] = useState(""); 

  useEffect(() => { 
    fetchFact().then(data => setDogData(data)); 
  }, []);
 

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <Animated.View>
        <View style={styles.main}>
          <Text style={styles.title}>Pawfect Pairing</Text>
          <Text style={styles.subtitle}>Find your new best friend</Text>
          <Link href="/main">View details</Link>
        </View>

        <View style={styles.factBox}> 
          <Text>{fact}</Text> 
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  factBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8, 
    backgroundColor: "whitesmoke", 
  },
});
