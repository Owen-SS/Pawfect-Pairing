import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ breed }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{breed.attributes.name}</Text>
      <Text>{breed.attributes.description}</Text>
      <Text>
        <Text style={styles.bold}>Life Expectancy:</Text>{' '}
        {breed.attributes.life.min} - {breed.attributes.life.max} years
      </Text>
      <Text>
        <Text style={styles.bold}>Male Weight:</Text>{' '}
        {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
      </Text>
      <Text>
        <Text style={styles.bold}>Female Weight:</Text>{' '}
        {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg
      </Text>
      <Text>
        <Text style={styles.bold}>Hypoallergenic:</Text>{' '}
        {breed.attributes.hypoallergenic ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Card;
