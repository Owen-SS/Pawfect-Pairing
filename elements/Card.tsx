import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Card = ({ breed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={breed.attributes.media_url }
          style={styles.image} 
          resizeMode="cover"
        />
        <Text style={styles.name}>{breed.attributes.name}</Text>
        <View style={styles.textbox}>
          <View style={styles.leftColumn}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Life Expectancy</Text>
                <Text style={styles.infoText}>{breed.attributes.life.min} - {breed.attributes.life.max} years</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Hypoallergenic</Text>
                <Text style={styles.infoText}>{breed.attributes.hypoallergenic ? 'Yes' : 'No'}</Text>
              </View>
          </View>

          <View style={styles.rightColumn}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Male Weight</Text> 
                <Text style={styles.infoText}>{breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Female Weight</Text>
                <Text style={styles.infoText}>{breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg </Text> 
              </View>
          </View>
        </View>

        {/* <Text style={styles.description}>{breed.attributes.description}</Text> */}
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
    maxWidth: 800,
    height: screenHeight - 130,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // boxShadow: '0 10 20px rgba(0, 0, 0, 0.2)', 
    gap: 12,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: "center",
  },
  textbox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  leftColumn: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
  },
  infoBox: {
    width: "100%",
    fontSize: 16,
    color: '#ffffff',
  },
  infoText: {
    fontSize: 25,
    color: 'black',
    flexDirection: 'column',
    textAlign: "center",
  },
  infoTitle: {
    textAlign: "center",
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default Card;
