import { MutationTree } from 'vuex';
import {
  SalesPersonState,
  SET_SALESPERSON,
  LOADING,
  UPDATE_SALESPERSON_STATUS
} from './types';

export const mutations: MutationTree<SalesPersonState> = {
  [SET_SALESPERSON](state: SalesPersonState, list: any) {
    state.salespersons = list;
  },

  [LOADING](state: SalesPersonState, flag: boolean) {
    state.loading = flag;
  },

  [UPDATE_SALESPERSON_STATUS](state: SalesPersonState, status: string) {
    state.updateSalesPersonStatus = status;
  }
};
