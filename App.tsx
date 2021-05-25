import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';

import { API_KEY } from './utils/WeatherAPIKey';
import { checkIfNightTime } from './utils/utils';

import Loading, { LoadingStates } from './screens/Loading';
import WeatherScreen from './screens/WeatherScreen';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [isFetchingLocation, setIsFetchingLocation] = useState(false);
	const [isFetchingWeather, setIsFetchingWeather] = useState(false);
	const [isNight, setIsNight] = useState(false);

	const [temperature, setTemperature] = useState(0);
	const [weatherCondition, setWeatherCondition] = useState('');
	const [nextDays, setNextDays] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const location: Location.LocationObject = await fetchLocation();
			const weather = await fetchWeather(location.coords.latitude, location.coords.longitude);

			setIsNight(checkIfNightTime(weather));

			setTemperature(weather.current.temp);
			setWeatherCondition(weather.current.weather[0].main);

			let nextDays = weather.daily.slice();
			nextDays.splice(0, 1);
			setNextDays(nextDays.slice());

			setIsLoading(false);
		})();
	}, []);

	async function verifyLocationPermissions(): Promise<boolean> {
		let result = await Location.requestForegroundPermissionsAsync();

		if (result.status !== 'granted') {
			Alert.alert('Insufficient Permissions', 'Permission to access the location was denied', [
				{ text: 'Okay' },
			]);
			return false;
		}
		return true;
	}

	async function fetchLocation(): Promise<Location.LocationObject | any> {
		const hasPermission = await verifyLocationPermissions();
		if (!hasPermission) return null;

		try {
			setIsFetchingLocation(true);
			const location = await Location.getCurrentPositionAsync();
			setIsFetchingLocation(false);

			return location;
		} catch (err) {
			Alert.alert('Could not fetch location!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	async function fetchWeather(latitude: number, longitude: number) {
		try {
			setIsFetchingWeather(true);
			const weatherJson = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
			);
			const weatherData = await weatherJson.json();
			setIsFetchingWeather(false);

			return weatherData;
		} catch (err) {
			Alert.alert('Could not fetch the weather!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	return (
		<NavigationContainer>
			<View style={styles.container}>
				<StatusBar style="auto" />
				{isLoading ? (
					<Loading
						loadingText={
							isFetchingLocation
								? 'Getting your location...'
								: isFetchingWeather
								? 'Getting the weather info...'
								: 'Loading...'
						}
						loadingState={isFetchingLocation ? LoadingStates.Location : LoadingStates.Weather}
					/>
				) : (
					<WeatherScreen
						weatherCondition={weatherCondition}
						temperature={temperature}
						isNight={isNight}
						nextDays={nextDays}
					/>
				)}
			</View>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
