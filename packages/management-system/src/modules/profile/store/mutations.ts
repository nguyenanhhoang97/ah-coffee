import { MutationTree } from 'vuex';
import {
  ProfileState,
  SET_PROFILE,
  LOADING,
  UPDATE_PASSWORD_STATUS,
  UPDATE_PROFILE_STATUS
} from './types';

export const mutations: MutationTree<ProfileState> = {
  [SET_PROFILE](state: ProfileState, list: any) {
    state.profile = list;
  },

  [LOADING](state: ProfileState, flag: boolean) {
    state.loading = flag;
  },

  [UPDATE_PASSWORD_STATUS](state: ProfileState, status: any) {
    state.updatePasswordStatus = status;
  },

  [UPDATE_PROFILE_STATUS](state: ProfileState, status: any) {
    state.updateProfileStatus = status;
  }
};
