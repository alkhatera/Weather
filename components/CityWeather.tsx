import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { cities } from '../utils/Cities';

function CityWeather(props: any) {
	const selectedCity = cities.find((city) => city.key === props.route.params.key);

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
