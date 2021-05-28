import { saveFavoriteCities, fetchFavoriteCities } from '../../utils/data_storage';
import firebase from 'firebase';

import { City } from '../../utils/Cities';

export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';
export const SET_CITIES = 'SET CITIES';

export type CitiesAction = {
	type: string;
	cities?: City[];
};

export const toggleFavorite = (cityToEdit: City, currentCities: City[]) => {
	return async (dispatch: any) => {
		const existingIndex = currentCities.findIndex((city: City) => city.key === cityToEdit.key);

		let updatedFavCities = [];
		if (existingIndex >= 0) {
			updatedFavCities = [...currentCities];
			updatedFavCities.splice(existingIndex, 1);
		} else {
			updatedFavCities = currentCities.concat(cityToEdit);
		}

		const userId = firebase.auth().currentUser?.uid;
		await saveFavoriteCities(userId as string, updatedFavCities);

		dispatch({ type: TOGGLE_FAVORITE, cities: updatedFavCities });
	};
};

export const fetchCities = () => {
	return async (dispatch: any) => {
		const userId = firebase.auth().currentUser?.uid;
		const cities = await fetchFavoriteCities(userId || '');

		dispatch({ type: SET_CITIES, cities: [...cities] });
	};
};
