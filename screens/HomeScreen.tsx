import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

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
