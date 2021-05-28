import { CITIES, City } from '../../utils/Cities';
import { CitiesAction, SET_CITIES, TOGGLE_FAVORITE } from '../actions/cities';

const initialState = {
	cities: CITIES,
	favoriteCities: [],
};

const citiesReducer = (state = initialState, action: CitiesAction) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			return { ...state, favoriteCities: action.cities };
		case SET_CITIES:
			return { ...state, favoriteCities: action.cities };
		default:
			return state;
	}
};

export default citiesReducer;
