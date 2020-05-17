import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import ToDo from './ToDo.js';
import Weather from './Weather.js';
import Joke from './Joke.js';
import Calendar from './Calendar.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ToDo" component={ToDo} />
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Joke" component={Joke} />
          <Stack.Screen name="Calendar" component={Calendar} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


