export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

interface AddUserAction {
	type: typeof ADD_USER;
	payload: User;
}

interface DeleteUserAction {
	type: typeof DELETE_USER;
	payload: null;
}

export interface User {
	username: string;
	email: string;
}

export interface UserState {
	user: User | null;
}

export type UserActionTypes = AddUserAction | DeleteUserAction;
