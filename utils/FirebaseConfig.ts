import firebase from 'firebase/app';

export const firebaseConfig = {
	apiKey: 'AIzaSyA9LvJ6cvqc1Y1ZbUpW9ghkdlzoJBbeheY',
	authDomain: 'weather-53d7d.firebaseapp.com',
	databaseURL: 'https://weather-53d7d-default-rtdb.firebaseio.com',
	projectId: 'weather-53d7d',
	storageBucket: 'weather-53d7d.appspot.com',
	messagingSenderId: '129954858997',
	appId: '1:129954858997:web:0d1bb1e36fe126414842bc',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
