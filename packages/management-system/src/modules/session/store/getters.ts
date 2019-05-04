import { GetterTree } from 'vuex';
import { SessionState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<SessionState, RootState> = {
  isAuthenticated(state): boolean {
    return !!state.token;
  },

  token(state): string {
    return state.token;
  },

  role(state): string {
    return state.role;
  }
};
