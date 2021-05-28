import { CITIES, City } from '../../utils/Cities';
import { CitiesAction, SET_CITIES, TOGGLE_FAVORITE } from '../actions/cities';
import { saveFavCities } from '../../utils/data_storage';
import firebase from 'firebase';

const initialState = {
	cities: CITIES,
	favoriteCities: [],
};

const citiesReducer = (state = initialState, action: CitiesAction) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favoriteCities.findIndex(
				(city: City) => city.key === action.cityId
			);
			const userId = firebase.auth().currentUser?.uid;
			(async () => {
				if (existingIndex >= 0) {
					const updatedFavCities = [...state.favoriteCities];
					updatedFavCities.splice(existingIndex, 1);

					const success = await saveFavCities(userId as string, updatedFavCities);

					if (!success) return { ...state };

					return { ...state, favoriteCities: updatedFavCities };
				} else {
					const city = state.cities.find((city: City) => city.key === action.cityId);
					const updatedFavCities = (<City[]>state.favoriteCities).concat(<City>city);

					const success = await saveFavCities(userId as string, updatedFavCities);

					if (!success) return { ...state };

					return { ...state, favoriteCities: updatedFavCities };
				}
			})();
			break;
		case SET_CITIES:
			return { ...state, favoriteCities: action.cities };
		default:
			return state;
	}
};

export default citiesReducer;
