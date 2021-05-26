import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { City } from '../utils/Cities';
import { toggleFavorite } from '../store/actions/cities';

function CityWeather(props: any) {
	const availableCities = useSelector((state: RootStateOrAny) => state.cities.cities);
	const cityKey = props.route.params.key;
	const selectedCity: City = availableCities.find((city: City) => city.key === cityKey);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(cityKey));
	}, [dispatch, cityKey]);

	useEffect(() => {
		props.navigation.setOptions({
			title: selectedCity?.name,
			headerRight: () => {
				return (
					<Button
						icon={<Ionicons name="star-outline" size={25} color="gray" />}
						title=""
						type="clear"
						style={{
							marginRight: 10,
						}}
						onPress={toggleFavoriteHandler}
					/>
				);
			},
		});
	}, [toggleFavoriteHandler, selectedCity.name]);

	return (
		<View>
			<Text>City Weather</Text>
		</View>
	);
}

const styles = StyleSheet.create({});

export default CityWeather;
