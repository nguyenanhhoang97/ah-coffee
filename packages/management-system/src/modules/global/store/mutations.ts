import { MutationTree } from 'vuex';
import { GlobalState, SET_GLOBAL_READY, SET_SIDEBAR } from './types';

export const mutations: MutationTree<GlobalState> = {
  [SET_GLOBAL_READY](state, flag: boolean) {
    state.ready = flag;
  },

  [SET_SIDEBAR](state, flag: boolean) {
    state.sidebarStyle = flag;
  }
};
