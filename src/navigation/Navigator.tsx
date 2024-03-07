import * as React from 'react';
import { Button, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../constants/Colors';

import {
  TvSeriesDetailsScreen,
  TvSeriesFavoritesScreen,
  TvSeriesOverviewScreen,
} from '../screens';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TvSeriesOverview"
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === 'android' ? Colors.primary : 'white',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        }}>
        <Stack.Screen
          name="TvSeriesOverview"
          component={TvSeriesOverviewScreen}
          options={({ navigation }) => ({
            title: 'All TV Series',
            headerRight: () => {
              return (
                <Button
                  title="Favorites"
                  color={Colors.accent}
                  onPress={() => navigation.navigate('Favorites')}
                />
              );
            },
            headerShown: true,
          })}
        />

        <Stack.Screen
          name="TvSeriesDetails"
          component={TvSeriesDetailsScreen}
          options={{
            title: 'Details',
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={TvSeriesFavoritesScreen}
          options={{
            title: 'Favorites',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
