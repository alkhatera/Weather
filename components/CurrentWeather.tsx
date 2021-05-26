import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { extractDay } from '../utils/utils';
import { weatherConditions } from '../utils/WeatherConditions';
import Card from '../components/Card';

function CurrentWeather(props: {
	weatherCondition: string;
	temperature: number;
	isNight: boolean;
	nextDays: any[];
}) {
	const [weatherCondition, setWeatherCondition] = useState(props.weatherCondition);

	if (weatherCondition === 'Clear' && props.isNight) {
		setWeatherCondition('ClearNight');
	}

	const width = Dimensions.get('window').width;

	return (
		<View
			style={[
				styles.screenContainer,
				{ backgroundColor: weatherConditions[weatherCondition]?.color },
			]}
		>
			<View style={styles.topContainer}>
				<View style={styles.temperatureView}>
					<MaterialCommunityIcons
						size={72}
						// @ts-ignore
						name={weatherConditions[weatherCondition]?.icon}
						color="#fff"
					/>
					<Text style={styles.tempText}>{props.temperature}°</Text>
				</View>
				<View style={styles.weatherConditionView}>
					<Text style={styles.title}>{weatherConditions[weatherCondition]?.title}</Text>
					<Text style={styles.subtitle}>{weatherConditions[weatherCondition]?.subtitle}</Text>
				</View>
			</View>
			<ScrollView style={styles.bottomContainer} contentContainerStyle={styles.cardsContainer}>
				{props.nextDays.map((day: any, index: number) => {
					return (
						<Card
							styles={[
								styles.card,
								{
									width: width - 25,
									backgroundColor: weatherConditions[day.weather[0].main]?.color,
								},
							]}
							key={index}
							title={day.weather[0].main}
							temp={day.temp.day}
							day={extractDay(day.dt)}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	topContainer: {
		marginVertical: 20,
		height: '30%',
		minHeight: 200,
		maxHeight: '35%',
	},
	temperatureView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	tempText: {
		fontSize: 72,
		color: '#fff',
	},
	weatherConditionView: {
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 60,
		color: '#fff',
	},
	subtitle: { fontSize: 24, color: '#fff' },
	bottomContainer: {
		flex: 2,
	},
	cardsContainer: {
		alignItems: 'center',
	},
	card: {
		color: 'white',
		borderRadius: 5,
		padding: 10,
		marginVertical: 5,
		width: '100%',
		minWidth: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});

export default CurrentWeather;
