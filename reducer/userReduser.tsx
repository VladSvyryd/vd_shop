import { UserState, UserActionTypes, ADD_USER, DELETE_USER } from '../interfaces/userTypes';

const initialState: UserState = {
	user: null,
  }

export function userReducer(state = initialState, action: UserActionTypes): UserState {
	switch (action.type) {
		case ADD_USER:
			return {
				user: action.payload,
			};
		case DELETE_USER:
			return {
				user: null,
			};
		default:
			return state;
	}
}
