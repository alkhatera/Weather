import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card(props: { styles: any; title: string; temp: number }) {
	return (
		<View style={props.styles}>
			<Text style={[styles.text, styles.title]}>Sunday</Text>
			<View style={styles.description}>
				<Text style={[styles.text, styles.subtitle]}>{props.title}</Text>
				<Text style={[styles.text, styles.subtitle]}>{props.temp} C</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
	},
	title: {
		fontSize: 24,
	},
	description: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	subtitle: {
		fontSize: 16,
	},
});

export default Card;
