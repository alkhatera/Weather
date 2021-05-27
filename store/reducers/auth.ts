import { ToggleAuthAction, TOGGLE_AUTH } from '../actions/auth';

const initialState = {
	isAuthenticated: false,
	user: null,
};

const authReducer = (state = initialState, action: ToggleAuthAction) => {
	switch (action.type) {
		case TOGGLE_AUTH:
			if (state.isAuthenticated) {
				return { ...state, isAuthenticated: false };
			} else {
				return { ...state, isAuthenticated: true };
			}
			break;
		default:
			return state;
	}
};

export default authReducer;
