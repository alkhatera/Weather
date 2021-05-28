import { City } from '../../utils/Cities';

export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';
export const SET_CITIES = 'SET CITIES';

export type CitiesAction = {
	type: string;
	cityId?: number;
	cities?: City[];
};

export const toggleFavorite = (id: number): CitiesAction => {
	return { type: TOGGLE_FAVORITE, cityId: id };
};

export const setCities = (cities: City[]): CitiesAction => {
	return { type: SET_CITIES, cities: [...cities] };
};
