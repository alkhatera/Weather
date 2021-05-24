import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { UpDownAnimation } from '../components/UpDownAnimation';
import { colors } from '../utils/WeatherConditions';

export enum LoadingStates {
	Location,
	Weather,
}

function Loading(props: { loadingText: string; loadingState: LoadingStates }) {
	const [backgroundCol, setBackgroundCol] = useState('#000');

	function changeBackgroundColor() {
		const randomIndex = Math.floor(Math.random() * colors.length);
		setBackgroundCol(colors[randomIndex]);
	}

	return (
		<View style={[styles.container, { backgroundColor: backgroundCol }]}>
			<UpDownAnimation style={styles.icon} onChangeBackground={changeBackgroundColor}>
				<MaterialCommunityIcons
					size={72}
					name={
						props.loadingState === LoadingStates.Location ? 'map-marker-outline' : 'weather-sunny'
					}
					color="#fff"
				/>
			</UpDownAnimation>
			<Text style={styles.text}>{props.loadingText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 24,
		color: '#fff',
	},
	icon: {
		marginBottom: 10,
	},
});

export default Loading;
