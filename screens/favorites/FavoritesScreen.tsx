import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';

import SearchResults from '../search/SearchResults';
import { City } from '../../utils/Cities';

function FavoritesScreen() {
	const favoriteCities: City[] = useSelector(
		(state: RootStateOrAny) => state.cities.favoriteCities
	);

	return favoriteCities.length <= 0 ? (
		<View style={styles.container}>
			<Text style={styles.text}>No cities were added to favorites 😓</Text>
		</View>
	) : (
		<SearchResults cities={favoriteCities} />
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
