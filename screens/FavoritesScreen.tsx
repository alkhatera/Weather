import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';

function FavoritesScreen() {
	const favortieCities = useSelector((state: RootStateOrAny) => state.cities.favoriteCities);

	return (
		<View>
			<Text>Favorites</Text>
		</View>
	);
}

const styles = StyleSheet.create({});

export default FavoritesScreen;
