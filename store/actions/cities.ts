export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';

export const toggleFavortie = (id: number) => {
	return { type: TOGGLE_FAVORITE, cityId: id };
};
