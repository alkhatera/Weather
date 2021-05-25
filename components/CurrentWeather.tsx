import React from 'react';
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
	if (props.weatherCondition === 'Clear' && props.isNight) {
		props.weatherCondition = 'ClearNight';
	}

	const width = Dimensions.get('window').width;

	return (
		<View
			style={[
				styles.screenContainer,
				{ backgroundColor: weatherConditions[props.weatherCondition]?.color },
			]}
		>
			<View style={styles.headerContainer}>
				<MaterialCommunityIcons
					size={72}
					// @ts-ignore
					name={weatherConditions[props.weatherCondition]?.icon}
					color="#fff"
				/>
				<Text style={styles.tempText}>{props.temperature}°</Text>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.title}>{weatherConditions[props.weatherCondition]?.title}</Text>
				<Text style={styles.subtitle}>{weatherConditions[props.weatherCondition]?.subtitle}</Text>
			</View>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				{props.nextDays.map((day: any, index: number) => {
					return (
						<Card
							styles={[
								styles.card,
								{
									width: width - 25,
									backgroundColor: weatherConditions[day.weather[0].main]?.color,
									borderColor: 'white',
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
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 60,
	},
	tempText: {
		fontSize: 72,
		color: '#fff',
	},
	card: {
		color: 'white',
		borderRadius: 5,
		padding: 10,
		marginVertical: 5,
		width: 100,
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
	bodyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 25,
	},
	title: {
		fontSize: 60,
		color: '#fff',
	},
	subtitle: { fontSize: 24, color: '#fff' },
});

export default CurrentWeather;
