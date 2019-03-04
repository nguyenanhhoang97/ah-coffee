import { GetterTree } from 'vuex';
import { GlobalState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<GlobalState, RootState> = {
  getSidebarStyle(state: GlobalState): boolean {
    return state.sidebarStyle;
  }
};
