import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect , useState } from "react";


export default function Page() {

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <View style={styles.main}>
        <Text style={styles.title}>Main</Text>
        <Text style={styles.subtitle}>The second screen</Text>
      </View>
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
