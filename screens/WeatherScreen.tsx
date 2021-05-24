import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { weatherConditions } from '../utils/WeatherConditions';

function WeatherScreen(props: { weatherCondition: string; temperature: number; isNight: boolean }) {
	if (props.weatherCondition === 'Clear' && props.isNight) {
		props.weatherCondition = 'ClearNight';
	}

	return (
		<View
			style={[
				styles.screenContainer,
				{ backgroundColor: weatherConditions[props.weatherCondition]?.color },
			]}
		>
			<View style={styles.headerContainer}>
				<MaterialCommunityIcons size={72} name="weather-sunny" color="#fff" />
				<Text style={styles.tempText}>{props.temperature}°</Text>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.nextDays}>
					<Text>Sunday</Text>
					<Text>Sunday</Text>
					<Text>Sunday</Text>
				</View>
				<View>
					<Text style={styles.title}>{weatherConditions[props.weatherCondition]?.title}</Text>
					<Text style={styles.subtitle}>{weatherConditions[props.weatherCondition]?.subtitle}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	tempText: {
		fontSize: 72,
		color: '#fff',
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 40,
	},
	nextDays: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 60,
		color: '#fff',
	},
	subtitle: { fontSize: 24, color: '#fff' },
});

export default WeatherScreen;
