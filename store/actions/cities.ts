export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';

export type ToggleFavAction = {
	type: string;
	cityId: number;
};

export const toggleFavorite = (id: number): ToggleFavAction => {
	return { type: TOGGLE_FAVORITE, cityId: id };
};
