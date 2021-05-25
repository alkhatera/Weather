import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WeatherScreen from '../screens/WeatherScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Current Weather" component={WeatherScreen}></Tab.Screen>
			<Tab.Screen name="Favorites" component={FavoritesScreen}></Tab.Screen>
		</Tab.Navigator>
	);
}
