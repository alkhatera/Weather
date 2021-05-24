import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Loading(props: { loadingText: string }) {
	return (
		<View style={styles.container}>
			<Text>{props.loadingText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Loading;
