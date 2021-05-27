export const TOGGLE_AUTH = 'TOGGLE AUTH';

export type ToggleAuthAction = {
	type: string;
};

export const toggleAuth = (): ToggleAuthAction => {
	return { type: TOGGLE_AUTH };
};
