import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import WeatherScreen from '../screens/WeatherScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: string = '';

					if (route.name === 'Current Weather') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'Favorites') {
						iconName = focused ? 'heart' : 'heart-outline';
					}

					// @ts-ignore
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: 'gray',
				inactiveTintColor: 'gray',
			}}
		>
			<Tab.Screen name="Current Weather" component={WeatherScreen}></Tab.Screen>
			<Tab.Screen name="Favorites" component={FavoritesScreen}></Tab.Screen>
		</Tab.Navigator>
	);
}
