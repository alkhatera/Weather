import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';

import SearchResults from '../components/SearchResults';

function FavoritesScreen(props: any) {
	const favortieCities = useSelector((state: RootStateOrAny) => state.cities.favoriteCities);

	return (
		<View>
			<SearchResults cities={favortieCities} />
		</View>
	);
}

const styles = StyleSheet.create({});

export default FavoritesScreen;
