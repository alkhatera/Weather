import { CITIES, City } from '../../utils/Cities';
import { TOGGLE_FAVORITE } from '../actions/cities';

const initialState = {
	cities: CITIES,
	favoriteCities: [],
};

const citiesReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favoriteCities.findIndex(
				(city: City) => city.key === action.cityId
			);
			if (existingIndex >= 0) {
				const updatedFavCities = [...state.favoriteCities];
				updatedFavCities.splice(existingIndex, 1);
				return { ...state, favoriteCities: updatedFavCities };
			} else {
				const city = state.cities.find((city: City) => city.key === action.cityId);
				return { ...state, favoriteCities: (<City[]>state.favoriteCities).concat(<City>city) };
			}
		default:
			return state;
	}
};

export default citiesReducer;
