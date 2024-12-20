import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../elements/Card';
import Breed from '../Models/Breed';
import Attributes from '../Models//Attributes';
import Relationship from '../Models//Relationship';
import Group from '../Models//Group';

const BreedList = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://dogapi.dog/api/v2/breeds');
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        const formattedBreeds = data.data.map((item: any) => {
          const breed = new Breed();

          breed.id = item.id;
          breed.type = item.type;

          breed.attributes = new Attributes(
            item.attributes.name,
            item.attributes.description,
            item.attributes.life,
            item.attributes.male_weight,
            item.attributes.female_weight,
            item.attributes.hypoallergenic
          );

          breed.relationships = new Relationship(
            new Group(item.relationships.group.data.id, item.relationships.group.data.type)
          );

          return breed;
        });
        
        setBreeds(formattedBreeds);
      } else {
        console.error('Data or data.data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card breed={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default BreedList;
