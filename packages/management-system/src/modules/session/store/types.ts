export const SET_USER = 'SET_SESSION_USER';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_PROFILE = 'SET_PROFILE';
export const CURRENT_ROLE = 'CURRENT_ROLE';

export interface SessionState {
  token: string;
  status: string;
  role: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
