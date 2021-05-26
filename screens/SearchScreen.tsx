import React, { useState, useEffect } from 'react';
import SearchResults from '../components/SearchResults';
import { RootStateOrAny, useSelector } from 'react-redux';

import { View, Text, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { City } from '../utils/Cities';

function SearchScreen() {
	const availableCities = useSelector((state: RootStateOrAny) => state.cities.cities);
	const [searchedForCity, setSearchedForCity] = useState('');
	const [foundCities, setFoundCities] = useState<any[]>([]);

	useEffect(() => {
		setFoundCities(availableCities.slice());
	}, [availableCities]);

	function filter(text: string): any[] {
		if (!text) return [];

		return availableCities.filter((city: City) => {
			return (
				city.name.toUpperCase().includes(text.toUpperCase()) ||
				city.country.toUpperCase().includes(text.toUpperCase())
			);
		});
	}

	return (
		<View style={{ backgroundColor: 'white' }}>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput
						style={styles.input}
						value={searchedForCity}
						onChangeText={(text) => {
							setSearchedForCity(text);
							setFoundCities(filter(searchedForCity));
						}}
						placeholder="Search for a city..."
					/>
				</View>
			</View>
			<View>
				<SearchResults cities={foundCities} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: {
		width: '100%',
	},
	label: {
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 7,
		paddingVertical: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 24,
	},
});

export default SearchScreen;
