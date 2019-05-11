export const SET_USER = 'SET_USER';
export const LOADING = 'LOADING';
export const CREATE_USER_STATUS = 'CREATE_USER_STATUS';
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';

export interface UserState {
  users: any;
  loading: boolean;
  createUserStatus: string;
  updateUserStatus: string;
  roles: any[];
}
