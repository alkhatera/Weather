import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

import { API_KEY } from './utils/WeatherAPIKey';

import Loading from './screens/Loading';
import WeatherScreen from './screens/WeatherScreen';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [temperature, setTemperature] = useState(0);
	const [weatherCondition, setWeatherCondition] = useState('');

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const location: Location.LocationObject = await fetchLocation();
			const weather = await fetchWeather(location.coords.latitude, location.coords.longitude);
			console.log(weather.current);
			setTemperature(weather.current.temp);
			setWeatherCondition(weather.current.weather[0].main);

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
			// Getting Location
			const location = await Location.getCurrentPositionAsync();
			// DONE
			return location;
		} catch (err) {
			Alert.alert('Could not fetch location!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	async function fetchWeather(latitude: number, longitude: number) {
		try {
			// Getting weather
			const weatherJson = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
			);
			const weatherData = await weatherJson.json();
			// DONE

			return weatherData;
		} catch (err) {
			Alert.alert('Could not fetch the weather!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{isLoading ? (
				<Loading loadingText={'Loading...'} />
			) : (
				<WeatherScreen weatherCondition={weatherCondition} temperature={temperature} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
