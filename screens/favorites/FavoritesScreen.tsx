import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import firebase from 'firebase';

import SearchResults from '../search/SearchResults';
import { City } from '../../utils/Cities';
import { fetchFavCities } from '../../utils/data_storage';

function FavoritesScreen(props: any) {
	const favortieCities: City[] = useSelector(
		(state: RootStateOrAny) => state.cities.favoriteCities
	);

	useEffect(() => {
		(async () => {
			const userId = firebase.auth().currentUser?.uid;
			const favCities = await fetchFavCities(userId || '');
			console.log(favCities);
		})();
	}, []);

	return favortieCities.length <= 0 ? (
		<View style={styles.container}>
			<Text style={styles.text}>No cities were added to favorites 😓</Text>
		</View>
	) : (
		<View>
			<SearchResults cities={favortieCities} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
	},
});

export default FavoritesScreen;
