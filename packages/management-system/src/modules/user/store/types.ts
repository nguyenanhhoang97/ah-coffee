export const SET_USER = 'SET_USER';
export const LOADING = 'LOADING';
export const CREATE_USER_STATUS = 'CREATE_USER_STATUS';
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const ADM_RESET_PSW_NEW_PSW = 'ADM_RESET_PSW_NEW_PSW';

export interface UserState {
  users: any;
  loading: boolean;
  createUserStatus: string;
  updateUserStatus: string;
  newPsw: string;
  roles: any[];
}
