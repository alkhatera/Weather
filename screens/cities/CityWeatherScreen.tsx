import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { City } from '../../utils/Cities';
import { API_KEY } from '../../utils/WeatherAPIKey';
import { checkIfNightTime } from '../../utils/utils';

import { toggleFavorite } from '../../store/actions/cities';
import LoadingScreen, { LoadingStates } from '../loading/LoadingScreen';
import CurrentWeather from '../../components/CurrentWeather';

function CityWeatherScreen(props: any) {
	const [isLoading, setIsLoading] = useState(false);

	const [isNight, setIsNight] = useState(false);
	const [temperature, setTemperature] = useState(0);
	const [weatherCondition, setWeatherCondition] = useState('');
	const [nextDays, setNextDays] = useState([]);

	const availableCities = useSelector((state: RootStateOrAny) => state.cities.cities);

	const cityKey = props.route.params.key;
	const selectedCity: City = availableCities.find((city: City) => city.key === cityKey);

	const currentCityIsFavorite = useSelector((state: RootStateOrAny) =>
		state.cities.favoriteCities.some((city: City) => city.key === cityKey)
	);

	const dispatch = useDispatch();
	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(cityKey));
	}, [dispatch, cityKey]);

	useEffect(() => {
		setNavigationOptions(toggleFavoriteHandler, selectedCity.name, currentCityIsFavorite);

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
	}, [toggleFavoriteHandler, selectedCity.name, currentCityIsFavorite]);

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
				`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
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
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
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
				<LoadingScreen
					loadingText={'Getting the weather info...'}
					loadingState={LoadingStates.Weather}
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

export default CityWeatherScreen;
