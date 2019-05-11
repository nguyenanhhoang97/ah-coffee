import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<UserState, RootState> = {
  getUsers(state: UserState): any {
    return state.users;
  },

  getLoading(state: UserState): any {
    return state.loading;
  }
};
