import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Card from '../elements/Card';
import Breed from '../Models/Breed';
import Attributes from '../Models/Attributes';
import Relationship from '../Models/Relationship';
import Group from '../Models/Group';


const BreedList = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://dogapi.dog/api/v2/breeds');
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        const formattedBreeds = await Promise.all(
          data.data.map(async (item: any) => {
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

            let breedName = item.attributes.name.toLowerCase();
            let imageMap = {
              'caucasian shepherd dog': require('../assets/images/caucasian-ovcharka.jpg'),
              'bouvier des flandres': require('../assets/images/Bouvier.jpg'),
              'grand basset griffon vendéen': require('../assets/images/Grand-Basset-Griffon-Vendeen.jpeg'),
              'hokkaido': require('../assets/images/Hokkaido.jpg'),
            };
            
            breed.attributes.media_url = imageMap[breedName] || null;
            return breed;
          })
        );

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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card breed={item} />}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});

export default BreedList;
