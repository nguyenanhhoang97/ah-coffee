import { GetterTree } from 'vuex';
import { ProfileState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<ProfileState, RootState> = {
  getProfile(state: ProfileState): any {
    return state.profile;
  },

  getLoading(state: ProfileState): any {
    return state.loading;
  }
};
