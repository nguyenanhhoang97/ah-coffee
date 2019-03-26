export const SET_PROFILE = 'SET_PROFILE';
export const UPDATE_PROFILE_STATUS = 'UPDATE_PROFILE_STATUS';
export const UPDATE_PASSWORD_STATUS = 'UPDATE_PASSWORD_STATUS';
export const LOADING = 'LOADING';

export interface ProfileState {
  profile: {};
  loading: boolean;
  updateProfileStatus: string;
  updatePasswordStatus: string;
}
