import { StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect } from "react";
import { Button } from 'react-native';

async function fetchFact() {
  const response = await fetch('https://dogapi.dog/api/v2/facts');
  const data = await response.json();
  alert('Hello ' + data.data[0].attributes.body);
}

export default function Page() {

  useEffect(() => { 
    fetchFact(); 
  }, []);

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <View style={styles.main}>
        <Text style={styles.title}>Pawfect Pairing</Text>
        <Text style={styles.subtitle}>Find your new best friend</Text>
      </View>
      <Button onPress={() => fetchFact()} title="Fetch a fact!" />
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
});
