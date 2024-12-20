import { StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect , useState } from "react";
import { Button } from 'react-native';

async function fetchFact() {
  const response = await fetch('https://dogapi.dog/api/v2/facts');
  const data = await response.json();

  let text = data.data[0].attributes.body
  // alert(text);
  return text
}

export default function Page() {
  const [fact, setFact] = useState("");

  useEffect(() => { 
    fetchFact().then(fact => setFact(fact)); 
  }, []);

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <View style={styles.main}>
        <Text style={styles.title}>Pawfect Pairing</Text>
        <Text style={styles.subtitle}>Find your new best friend</Text>
      </View>

      <View style={styles.factBox}> 
        <Text>{fact}</Text> 
      </View>

      {/* <Button onPress={() => fetchFact()} title="Fetch a fact!" /> */}
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
    borderWidth: 1,
    borderColor: "#ccc", 
    padding: 15,
    borderRadius: 8, 
    backgroundColor: "#f9f9f9", 
  },
});
