import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import { City } from '../../utils/Cities';

function SearchResults(props: { cities: City[] }) {
	const navigation = useNavigation();

	return (
		<FlatList
			data={props.cities}
			keyExtractor={(item) => '' + item.key}
			renderItem={(cityData) => (
				<ListItem
					key={cityData.item.key}
					Component={TouchableScale}
					// @ts-ignore
					friction={90}
					tension={100}
					activeScale={0.95}
					bottomDivider
					onPress={() => {
						navigation.navigate('City', { key: cityData.item.key });
					}}
				>
					<ListItem.Content>
						<ListItem.Title>{cityData.item.name}</ListItem.Title>
						<ListItem.Subtitle>{cityData.item.country}</ListItem.Subtitle>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	listItem: {},
	listText: {
		fontSize: 20,
	},
});

export default SearchResults;
