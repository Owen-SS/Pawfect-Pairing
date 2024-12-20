import * as React from 'react';
import { Text, View, Button } from "react-native";


const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        />
      </View>
    );
  };

export default HomeScreen;