import { CITIES } from '../../utils/Cities';

const initialState = {
	cities: CITIES,
	favoriteMeals: [],
};

const citiesReducer = (state = initialState, action: any) => {
	return state;
};

export default citiesReducer;
