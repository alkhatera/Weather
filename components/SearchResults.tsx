import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

function SearchResults(props: any) {
	const navigation = useNavigation();

	return (
		<FlatList
			data={props.cities}
			keyExtractor={(item) => item.key.toString()}
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
