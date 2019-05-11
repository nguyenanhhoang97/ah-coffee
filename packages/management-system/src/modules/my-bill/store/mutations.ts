import { MutationTree } from 'vuex';
import {
  MyBillState,
  SET_BILLS,
  LOADING,
} from './types';

export const mutations: MutationTree<MyBillState> = {
  [SET_BILLS](state: MyBillState, list: any) {
    state.bills = list;
  },

  [LOADING](state: MyBillState, flag: boolean) {
    state.loading = flag;
  }
};
