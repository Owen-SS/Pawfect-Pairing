import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      return "Could not retrieve a dog fact.";
    }
  } catch (error) {
    console.error("Error fetching fact:", error);
    return "Failed to fetch dog fact.";
  }
}

export default function DogFact() {
  const [fact, setFact] = useState("Loading dog fact...");

  useEffect(() => {
    let isMounted = true;

    fetchFact().then(data => {
      if (isMounted) {
        setFact(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.factBox}>
      <Text>{fact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  factBox: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: "whitesmoke",
    marginBottom: 30,
    alignItems: "center"
  },
});
