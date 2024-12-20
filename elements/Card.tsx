import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Card = ({ breed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
          <Image 
            source={breed.attributes.media_url} 
            style={styles.image} 
            resizeMode="cover" 
          />
        <Text style={styles.name}>{breed.attributes.name}</Text>
        <View style={styles.textbox}>
          <View style={styles.leftColumn}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Life Expectancy:</Text>{' '}
              {breed.attributes.life.min} - {breed.attributes.life.max} years
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Hypoallergenic:</Text>{' '}
              {breed.attributes.hypoallergenic ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Male Weight:</Text>{' '}
              {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Female Weight:</Text>{' '}
              {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{breed.attributes.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight - 130,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    gap: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textbox: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default Card;
