import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { City } from '../../utils/Cities';
import { checkIfNightTime } from '../../utils/utils';

import * as citiesActions from '../../store/actions/cities';
import CurrentWeather from '../../components/CurrentWeather';

function CityWeatherScreen(props: any) {
	const [isLoading, setIsLoading] = useState(false);

	const [isNight, setIsNight] = useState(false);
	const [temperature, setTemperature] = useState(0);
	const [weatherCondition, setWeatherCondition] = useState('');
	const [nextDays, setNextDays] = useState([]);

	const availableCities = useSelector((state: RootStateOrAny) => state.cities.cities);
	const favoriteCities = useSelector((state: RootStateOrAny) => state.cities.favoriteCities);

	const cityKey = props.route.params.key;
	const currentCityIsFavorite = favoriteCities.some((city: City) => city.key === cityKey);

	const selectedCity: City = availableCities.find((city: City) => city.key === cityKey);

	const dispatch = useDispatch();
	const saveFavorites = useCallback(async () => {
		setIsLoading(true);
		await dispatch(citiesActions.toggleFavorite(selectedCity, favoriteCities));
		setIsLoading(false);
	}, [dispatch, setIsLoading, selectedCity, favoriteCities]);

	useEffect(() => {
		setNavigationOptions(saveFavorites, selectedCity.name, currentCityIsFavorite);

		(async () => {
			setIsLoading(true);

			const weather = await fetchWeatherUsingCity(selectedCity.name);
			setIsNight(checkIfNightTime(weather));

			setTemperature(weather.current.temp);
			setWeatherCondition(weather.current.weather[0].main);

			let nextDays = weather.daily.slice();
			nextDays.splice(0, 1);
			setNextDays(nextDays.slice());

			setIsLoading(false);
		})();
	}, [saveFavorites, selectedCity.name, currentCityIsFavorite]);

	function setNavigationOptions(handler: any, cityName: string, isFav: boolean) {
		props.navigation.setOptions({
			title: cityName,
			headerRight: () => {
				return (
					<Button
						icon={<Ionicons name={isFav ? 'star' : 'star-outline'} size={25} color="gray" />}
						title=""
						type="clear"
						style={{
							marginRight: 10,
						}}
						onPress={handler}
					/>
				);
			},
		});
	}

	async function fetchWeatherUsingCity(cityName: string) {
		try {
			const weatherJson = await fetch(
				`https://us-central1-alaa-1158f.cloudfunctions.net/fetchWeatherUsingCity?cityName=${cityName}`
			);
			const weatherData = await weatherJson.json();

			return await fetchWeather(weatherData.coord.lat, weatherData.coord.lon);
		} catch (err) {
			Alert.alert('Could not fetch the weather!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	async function fetchWeather(latitude: number, longitude: number) {
		try {
			const weatherJson = await fetch(
				`https://us-central1-alaa-1158f.cloudfunctions.net/fetchWeatherUsingLatLon?lat=${latitude}&lon=${longitude}`
			);
			const weatherData = await weatherJson.json();

			return weatherData;
		} catch (err) {
			Alert.alert('Could not fetch the weather!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	return (
		<View style={styles.container}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
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
	loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CityWeatherScreen;
