import { ActionTree } from 'vuex';

import { GlobalState, SET_GLOBAL_READY } from './types';
import { RootState } from '@/store/types';

export const actions: ActionTree<GlobalState, RootState> = {
  setGlobalReady({ commit }, flag: boolean) {
    commit(SET_GLOBAL_READY, flag);
  }
};
