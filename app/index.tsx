import { StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import React, { useEffect , useState } from "react";
import { Button } from 'react-native';

async function fetchDog() {
  const response = await fetch('https://dogapi.dog/api/v2/breeds');
  const data = await response.json();
  let name = data.data[0].attributes.name
  let description = data.data[0].attributes.description
  // alert(text);
  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </View>
  )
}

// function Avatar() {
//   return (
//     <img
//       className="avatar"
//       src="https://i.imgur.com/1bX5QH6.jpg"
//       alt="Lin Lanying"
//       width={100}
//       height={100}
//     />
//   );
// }

export default function Profile() {
  return (
    <Avatar />
  );
}


export default function Page() {
  const [name, setName] = useState("");

  useEffect(() => { 
    fetchDog().then(
      name => setName(name)
    ); 
  }, []);

  return (
    <View style={styles.container}>
      <SystemBars style="auto" />
      <View style={styles.main}>
        <Text style={styles.title}>Pawfect Pairing</Text>
        <Text style={styles.subtitle}>Find your new best friend</Text>
      </View>

      <View style={styles.factBox}> 
        { name }
        {/* <Text>{name}</Text> 
        <Text>{description}</Text> */}
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
