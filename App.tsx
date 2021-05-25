import React from 'react';
import { Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './screens/SearchScreen';
import WeatherScreen from './screens/WeatherScreen';
import CityWeather from './components/CityWeather';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={WeatherScreen}
					options={({ navigation }) => ({
						title: 'Current Weather',
						headerRight: () => {
							return (
								<Button
									title="Search"
									onPress={() => {
										navigation.navigate('Search');
									}}
								/>
							);
						},
					})}
				/>
				<Stack.Screen name="Search" component={SearchScreen} />
				<Stack.Screen name="City" component={CityWeather} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
