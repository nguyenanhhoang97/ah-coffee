import { GetterTree } from 'vuex';
import { DashboardState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<DashboardState, RootState> = {
  getStatistics(state: DashboardState): any {
    return state.statistics;
  },

  getBills(state: DashboardState): any {
    return state.bills;
  },

  getLoading(state: DashboardState): any {
    return state.loading;
  }
};
