import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

import { API_KEY } from './utils/WeatherAPIKey';

import Loading, { LoadingStates } from './screens/Loading';
import WeatherScreen from './screens/WeatherScreen';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [isFetchingLocation, setIsFetchingLocation] = useState(false);
	const [isFetchingWeather, setIsFetchingWeather] = useState(false);
	const [temperature, setTemperature] = useState(0);
	const [weatherCondition, setWeatherCondition] = useState('');
	const [isNight, setIsNight] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const location: Location.LocationObject = await fetchLocation();
			const weather = await fetchWeather(location.coords.latitude, location.coords.longitude);

			const currnetHour = new Date(weather.current.dt * 1000).getHours();
			const sunriseHour = new Date(weather.current.sunrise * 1000).getHours();
			const sunsetHour = new Date(weather.current.sunset * 1000).getHours();

			if (currnetHour < sunriseHour || currnetHour > sunsetHour) {
				setIsNight(true);
			}

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
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
