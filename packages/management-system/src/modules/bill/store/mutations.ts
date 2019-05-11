import { MutationTree } from 'vuex';
import {
  BillState,
  SET_BILLS,
  LOADING,
} from './types';

export const mutations: MutationTree<BillState> = {
  [SET_BILLS](state: BillState, list: any) {
    state.bills = list;
  },

  [LOADING](state: BillState, flag: boolean) {
    state.loading = flag;
  }
};
