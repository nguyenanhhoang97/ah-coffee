import { MutationTree } from 'vuex';
import { DashboardState, SET_STATISTICS, SET_BILLS, LOADING } from './types';

export const mutations: MutationTree<DashboardState> = {
  [SET_STATISTICS](state: DashboardState, list: any) {
    state.statistics = list;
  },

  [SET_BILLS](state: DashboardState, list: any) {
    state.bills = list;
  },

  [LOADING](state: DashboardState, flag: boolean) {
    state.loading = flag;
  }
};
