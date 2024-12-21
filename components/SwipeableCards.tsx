import Card from '../elements/Card';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Breed from '../Models/Breed';
import Attributes from '../Models/Attributes';
import Relationship from '../Models/Relationship';
import Group from '../Models/Group';

const { height } = Dimensions.get('window');

export default function SwipeableContainer() {
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const translateX = useSharedValue(0);
  const startX = useRef(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const fetchBreed = async () => {
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

  const handleSwipe = () => {
    console.warn('Swipe detected!')
    setCurrentBreedIndex((prevIndex) => prevIndex + 1);
    translateX.value = withTiming(0); 
    if (currentBreedIndex + 1 >= breeds.length) {
      fetchBreed(); 
    }
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { translateX: number }) => {
      context.translateX = Number(translateX.value);
    },
    onActive: (event, context: { translateX: number }) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        runOnJS(handleSwipe)(); 
      } else {
        translateX.value = withTiming(0);
      }
    },
  });



  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX.current;
    if (deltaX > 100) {
      handleSwipe();
    } else {
      translateX.value = withTiming(0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handleSwipe();
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    fetchBreed(); // Initial fetch
  }, []); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { height }]}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[animatedStyles, styles.panView]}
            onTouchStart={Platform.OS === 'web' ? handleTouchStart : undefined}
            onTouchEnd={Platform.OS === 'web' ? handleTouchEnd : undefined}
          >
            {breeds.length > 0 && ( 
              <Card breed={breeds[currentBreedIndex]} />
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  panView: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});