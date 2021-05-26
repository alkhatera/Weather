import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import SearchScreen from './screens/search/SearchScreen';
import CityWeatherScreen from './screens/cities/CityWeatherScreen';
import HomeScreen from './screens/home/HomeScreen';
import citiesReducer from './store/reducers/cities';
import AuthScreen from './screens/auth/AuthScreen';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
	cities: citiesReducer,
});
const store = createStore(rootReducer);

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar style="auto" />
				<Stack.Navigator
					screenOptions={isLoggedIn ? { headerShown: true } : { headerShown: false }}
				>
					{isLoggedIn ? (
						<>
							{' '}
							<Stack.Screen
								name="Home"
								component={HomeScreen}
								options={({ navigation }) => ({
									title: 'Weather',
									headerRight: () => {
										return (
											<Button
												icon={<Ionicons name="search" size={25} color="gray" />}
												title=""
												type="clear"
												style={{
													marginRight: 10,
												}}
												onPress={() => {
													navigation.navigate('Search');
												}}
											/>
										);
									},
								})}
							/>
							<Stack.Screen name="Search" component={SearchScreen} />
							<Stack.Screen name="City" component={CityWeatherScreen} />{' '}
						</>
					) : (
						<Stack.Screen name="Authentication" component={AuthScreen} />
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
