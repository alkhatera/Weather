import React, { useState } from 'react';
import {
	ScrollView,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	Alert,
} from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { firebaseConfig } from '../../utils/FirebaseConfig';
import firebase from 'firebase';

function AuthScreen(props: any) {
	const [errorMessage, setErrorMessage] = useState<string>();
	const [isSendingSMS, setIsSendingSMS] = useState<boolean>(false);
	const [isVerifyingSMS, setVerifyingSMS] = useState<boolean>(false);

	const input = React.createRef<TextInput>();
	const [country, setCountry] = useState<Country>({
		callingCode: ['966'],
		cca2: 'SA',
		currency: [''],
		flag: '',
		name: '',
		region: 'Asia',
		subregion: 'Middle Africa',
	});
	const [phoneNumber, setPhoneNumber] = useState<string>();

	const recaptchaVerifier = React.useRef<any>(null);
	const [verificationId, setVerificationId] = useState<string>('');
	const [enteredVerificationCode, setEnteredVerificationCode] = useState<string>('');

	// TODO: Focus on input
	async function sendSMSHandler() {
		if (!country?.callingCode[0] || !phoneNumber) return;
		try {
			setIsSendingSMS(true);
			const countryCode = '+' + country.callingCode[0];
			const fullPhoneNumber = countryCode + phoneNumber;

			const phoneProvider = new firebase.auth.PhoneAuthProvider();
			const verificationId = await phoneProvider.verifyPhoneNumber(
				fullPhoneNumber,
				recaptchaVerifier.current as firebase.auth.ApplicationVerifier
			);
			setVerificationId(verificationId);
			setIsSendingSMS(false);
		} catch (error) {
			Alert.alert('Could not send SMS!', 'Please try again later', [{ text: 'Okay' }]);
		}
	}

	async function continueHandler() {
		try {
			setVerifyingSMS(true);
			const credential = firebase.auth.PhoneAuthProvider.credential(
				verificationId,
				enteredVerificationCode
			);
			await firebase.auth().signInWithCredential(credential);
			setVerifyingSMS(false);
		} catch (err) {
			Alert.alert('Entered code is not correct!', 'Please enter it again', [{ text: 'Okay' }]);
		}
	}

	return (
		<View style={styles.screen}>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				attemptInvisibleVerification
			/>
			<ScrollView style={styles.scrollView}>
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={50}
					style={styles.keyboardAvoidingView}
				>
					<Card containerStyle={styles.authContainer}>
						<View style={styles.titleAndSubtitleContainer}>
							<Text style={styles.title}>Hey there 👋!</Text>
							<Text style={styles.subtitle}>You can register and login from here </Text>
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
									setPhoneNumber(text);
								}}
								onEndEditing={() => {
									// Show Error
								}}
								maxLength={9}
								editable={!verificationId}
								containerStyle={{ maxWidth: '80%' }}
								keyboardAppearance="dark"
							/>
						</View>
						<Button
							title={`${verificationId ? 'Resend' : 'Send'} Verification Code`}
							titleStyle={styles.buttonText}
							buttonStyle={styles.button}
							disabled={!(phoneNumber?.length === 9)}
							onPress={sendSMSHandler}
							loading={isSendingSMS}
						></Button>
						{!!verificationId ? (
							<View>
								<Text style={styles.OTPViewTitle}>Enter the code sent to you:</Text>
								<OTPInputView
									pinCount={6}
									onCodeFilled={(code) => {
										setEnteredVerificationCode(code);
									}}
									keyboardType="number-pad"
									keyboardAppearance="dark"
									style={styles.OTPInput}
								/>
								<Button
									title="Confirm Verification Code"
									titleStyle={styles.buttonText}
									buttonStyle={styles.button}
									disabled={!enteredVerificationCode}
									onPress={() => {
										continueHandler();
									}}
									loading={isVerifyingSMS}
								></Button>
							</View>
						) : (
							<Text></Text>
						)}
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
	OTPViewTitle: {
		marginTop: '10%',
		paddingHorizontal: 10,
		color: 'gray',
		fontSize: 24,
	},
	OTPInput: { width: '100%', height: 80, paddingHorizontal: 10 },
});

export default AuthScreen;
