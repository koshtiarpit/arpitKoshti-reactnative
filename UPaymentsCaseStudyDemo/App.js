/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import CreateScreen from './src/screens/CreateScreen';
import Icon from 'react-native-vector-icons/EvilIcons';
import {TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'UPayments Store',
            headerTitleStyle: {
              fontStyle: 'italic',
              fontWeight: '400',
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="search" size={32} color={'black'} />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
