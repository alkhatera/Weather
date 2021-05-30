import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import SearchResults from '../search/SearchResults';
import * as citiesActions from '../../store/actions/cities';
import { City } from '../../utils/Cities';
import { useIsFocused } from '@react-navigation/core';

function FavoritesScreen(props: any) {
	const favoriteCities: City[] = useSelector(
		(state: RootStateOrAny) => state.cities.favoriteCities
	);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const loadFavorites = useCallback(async () => {
		setIsLoading(true);
		await dispatch(citiesActions.fetchCities());
		setIsLoading(false);
	}, [dispatch, setIsLoading]);

	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) loadFavorites();
	}, [loadFavorites, isFocused]);

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
