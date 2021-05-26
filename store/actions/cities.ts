export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';

export const toggleFavorite = (id: number) => {
	return { type: TOGGLE_FAVORITE, cityId: id };
};
