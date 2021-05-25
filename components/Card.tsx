import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card(props: { styles: any; title: string; temp: number; day: string }) {
	return (
		<View style={props.styles}>
			<Text style={[styles.text, styles.title]}>{props.day}</Text>
			<Text style={[styles.text, styles.subtitle]}>
				{props.title}, {props.temp} C
			</Text>
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
