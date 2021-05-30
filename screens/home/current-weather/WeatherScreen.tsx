import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

import { checkIfNightTime } from '../../../utils/utils';

import LoadingScreen, { LoadingStates } from '../../loading/LoadingScreen';
import CurrentWeather from '../../../components/CurrentWeather';

function WeatherScreen() {
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
				`https://us-central1-alaa-1158f.cloudfunctions.net/fetchWeatherUsingLatLon?lat=${latitude}&lon=${longitude}`
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
			{isLoading ? (
				<LoadingScreen
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
				<CurrentWeather
					weatherCondition={weatherCondition}
					temperature={temperature}
					isNight={isNight}
					nextDays={nextDays}
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

export default WeatherScreen;
