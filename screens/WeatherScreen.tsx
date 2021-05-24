import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { weatherConditions } from '../utils/WeatherConditions';
import Card from '../components/Card';

function WeatherScreen(props: {
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
			<View style={styles.nextDays}>
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
						/>
					);
				})}
			</View>
			<View style={styles.bodyContainer}>
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
		marginTop: 60,
	},
	tempText: {
		fontSize: 72,
		color: '#fff',
	},
	nextDays: {
		flex: 4,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	card: {
		color: 'white',
		borderRadius: 5,
		padding: 10,
		width: 100,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 60,
	},
	title: {
		fontSize: 60,
		color: '#fff',
	},
	subtitle: { fontSize: 24, color: '#fff' },
});

export default WeatherScreen;
