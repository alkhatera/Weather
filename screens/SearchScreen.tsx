import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';

import { cities } from '../utils/Cities';

import { View, Text, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';

function SearchScreen() {
	const [searchedForCity, setSearchedForCity] = useState('');
	const [foundCities, setFoundCitites] = useState([]);

	return (
		<View style={{ backgroundColor: 'white' }}>
			<View style={styles.form}>
				<View style={styles.formControl}>
					{/* <Text style={styles.label}>Search for a city...</Text> */}
					<TextInput
						style={styles.input}
						value={searchedForCity}
						onChangeText={(text) => setSearchedForCity(text)}
						placeholder="Search for a city..."
					/>
				</View>
			</View>
			<View>
				<SearchResults cities={cities} />
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
