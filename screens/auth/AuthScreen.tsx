import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { Card, Input } from 'react-native-elements';

function AuthScreen(props: any) {
	return (
		<View style={styles.screen}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={50}
					style={{ flex: 1, alignItems: 'center' }}
				>
					<Card containerStyle={styles.authContainer} wrapperStyle={{ backgroundColor: 'red' }}>
						<Input placeholder="PN" />
					</Card>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
	},
	authContainer: {
		// backgroundColor:00
		width: '100%',
	},
});

export default AuthScreen;
