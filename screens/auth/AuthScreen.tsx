import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text, TextInput } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CountryPicker, { Country } from 'react-native-country-picker-modal';

function AuthScreen(props: any) {
	const [errorMessage, setErrorMessage] = useState<string>();
	const [country, setCountry] = useState<Country>();
	const input = React.createRef<TextInput>();

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView}>
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={50}
					style={styles.keyboardAvoidingView}
				>
					<Card containerStyle={styles.authContainer}>
						<View style={styles.titleAndSubtitleContainer}>
							<Text style={styles.title}>Hey there 👋!</Text>
							<Text style={styles.subtitle}>You can register or login from here </Text>
						</View>
						<View style={styles.inputContainer}>
							<CountryPicker
								withFilter
								withFlag
								withCallingCode
								onSelect={(country: Country) => {
									setCountry(country);
								}}
								// @ts-ignore
								countryCode={country?.cca2 || 'SA'}
							/>
							<Input
								label="Phone Number"
								ref={input}
								keyboardType="phone-pad"
								autoFocus
								errorMessage={errorMessage}
								onChangeText={(text: string) => {
									console.log(text);
								}}
								onEndEditing={() => {
									// Show Error
								}}
								maxLength={9}
								containerStyle={{ maxWidth: '80%' }}
							/>
						</View>
						<Button
							title="Sign In"
							titleStyle={styles.buttonText}
							buttonStyle={styles.button}
						></Button>
					</Card>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scrollView: {},
	keyboardAvoidingView: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '50%',
	},
	authContainer: {
		flex: 1,
		width: '90%',
		paddingVertical: '10%',
		justifyContent: 'space-between',
		textAlign: 'center',
	},
	titleAndSubtitleContainer: {
		marginBottom: 50,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 48,
		color: 'gray',
	},
	subtitle: {
		textAlign: 'center',
		color: 'gray',
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		marginTop: '10%',
		backgroundColor: '#ffd431',
		borderRadius: 20,
		paddingVertical: 15,
	},
	buttonText: {
		color: 'gray',
	},
});

export default AuthScreen;
