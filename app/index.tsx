import { StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect , useState } from "react";
import { Button } from 'react-native';

async function fetchDog() {
  const response = await fetch('https://dogapi.dog/api/v2/breeds');
  const data = await response.json();
  let dogs = data.data;
  let name = dogs[0].attributes.name;
  let description = dogs[0].attributes.description;
  return { name, description }; // Return an object with name and description
}



export default function Page() {
  const [dogData, setDogData] = useState({ name: "", description: "" }); // State to store both name and description

  useEffect(() => { 
    fetchDog().then(data => setDogData(data)); // Update state with the fetched data
  }, []);

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <View style={styles.main}>
        <Text style={styles.title}>Pawfect Pairing</Text>
        <Text style={styles.subtitle}>Find your new best friend</Text>
      </View>

      <View style={styles.factBox}> 
        <Text>{dogData.name}</Text> 
        <Text>{dogData.description}</Text> 
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
    padding: 15,
    borderRadius: 8, 
    backgroundColor: "whitesmoke", 
  },
});
