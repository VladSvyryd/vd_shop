import { User, ADD_USER, DELETE_USER, UserActionTypes } from '../../interfaces/userTypes'

// TypeScript infers that this function is returning AddUserAction
export function addUser(newUser: User): UserActionTypes {
  return {
    type: ADD_USER,
    payload: newUser
  }
}

// TypeScript infers that this function is returning DeleteUserAction
export function deleteUser(): UserActionTypes {
  return {
    type: DELETE_USER,
    payload: null
  }
}