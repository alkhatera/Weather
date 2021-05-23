import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Loading from './screens/Loading';
import WeatherScreen from './screens/WeatherScreen';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{isLoading ? (
				<Loading />
			) : (
				<WeatherScreen pageColor="#3CD3AD" title="Sunny" subtitle="So Sunny Bro" temperature={92} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
