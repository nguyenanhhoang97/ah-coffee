import { MutationTree } from 'vuex';
import {
  UserState,
  SET_USER,
  LOADING,
  CREATE_USER_STATUS,
  UPDATE_USER_STATUS
} from './types';

export const mutations: MutationTree<UserState> = {
  [SET_USER](state: UserState, list: any) {
    state.users = list;
  },

  [LOADING](state: UserState, flag: boolean) {
    state.loading = flag;
  },

  [CREATE_USER_STATUS](state: UserState, status: string) {
    state.createUserStatus = status;
  },

  [UPDATE_USER_STATUS](state: UserState, status: string) {
    state.updateUserStatus = status;
  }
};
