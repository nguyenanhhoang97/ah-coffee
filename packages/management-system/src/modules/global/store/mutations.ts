import { MutationTree } from 'vuex';
import { GlobalState, SET_GLOBAL_READY } from './types';

export const mutations: MutationTree<GlobalState> = {
  [SET_GLOBAL_READY](state, flag: boolean) {
    state.ready = flag;
  }
};
