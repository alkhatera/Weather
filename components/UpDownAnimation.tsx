import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const UpDownAnimation = (props: any) => {
	let upDownAnim: Animated.Value = useRef(new Animated.Value(0)).current;
	let intervalId: NodeJS.Timeout;

	useEffect(() => {
		Animated.loop(
			Animated.timing(upDownAnim, {
				toValue: 1,
				useNativeDriver: true,
				duration: 1000,
			}),
			{}
		).start();

		intervalId = setInterval(() => {
			// CHANGE IT
			props.onChangeBackground();
		}, 1000);
	}, [upDownAnim]);

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		};
	}, [props.current]);

	return (
		<Animated.View
			style={{
				...props.style,
				opacity: upDownAnim,
			}}
		>
			{props.children}
		</Animated.View>
	);
};
