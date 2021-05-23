import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function WeatherScreen(props: {
	pageColor: string;
	temperature: number;
	title: string;
	subtitle: string;
}) {
	return (
		<View style={[styles.screenContainer, { backgroundColor: props.pageColor }]}>
			<View style={styles.headerContainer}>
				<MaterialCommunityIcons size={48} name="weather-sunny" color="#fff" />
				<Text style={styles.tempText}>{props.temperature}°</Text>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.subtitle}>{props.subtitle}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tempText: {
		fontSize: 48,
		color: '#fff',
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 40,
	},
	title: {
		fontSize: 48,
		color: '#fff',
	},
	subtitle: { fontSize: 24, color: '#fff' },
});

export default WeatherScreen;
