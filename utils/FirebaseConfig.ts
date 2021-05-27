import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyA_5Zxmet0ghQNHheM2eh-QWElrS2Pjd7I',
	authDomain: 'weather-app-8dd86.firebaseapp.com',
	projectId: 'weather-app-8dd86',
	storageBucket: 'weather-app-8dd86.appspot.com',
	messagingSenderId: '794134709941',
	appId: '1:794134709941:web:662f1404b3a05a763a20fc',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
