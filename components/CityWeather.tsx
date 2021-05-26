import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';

import { City } from '../utils/Cities';

function CityWeather(props: any) {
	const availableCities = useSelector((state: RootStateOrAny) => state.cities.cities);

	const selectedCity = availableCities.find((city: City) => city.key === props.route.params.key);
	useEffect(() => {
		props.navigation.setOptions({ title: selectedCity?.name });
	}, []);

	return (
		<View>
			<Text>City Weather</Text>
		</View>
	);
}

const styles = StyleSheet.create({});

export default CityWeather;
