import firebase from 'firebase/app';

export const firebaseConfig = {
	apiKey: 'AIzaSyCLRgwGETPKzJ3dDBLuvdDDnIZntKaNaLE',
	authDomain: 'alaa-1158f.firebaseapp.com',
	databaseURL: 'https://alaa-1158f-default-rtdb.firebaseio.com',
	projectId: 'alaa-1158f',
	storageBucket: 'alaa-1158f.appspot.com',
	messagingSenderId: '925529573672',
	appId: '1:925529573672:web:7dc18f8b39a25da83ee81d',
	measurementId: 'G-NYSDXDWDVY',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
