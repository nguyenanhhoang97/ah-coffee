import { MutationTree } from 'vuex';
import {
  SessionState,
  SET_USER,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  SET_PROFILE,
} from './types';

export const mutations: MutationTree<SessionState> = {
  [AUTH_REQUEST](state) {
    state.status = 'loading';
  },

  [AUTH_SUCCESS](state, token) {
    state.status = 'success';
    state.token = token;
  },

  [AUTH_ERROR](state) {
    state.status = 'error';
  },

  [AUTH_LOGOUT](state) {
    state.token = '';
  },

  // [SET_PROFILE](state, profile: Profile) {
  //   state.profile = profile;
  // },
};
