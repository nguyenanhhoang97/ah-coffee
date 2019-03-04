import { MutationTree } from 'vuex';
import { DashboardState, SET_STATISTICS } from './types';

export const mutations: MutationTree<DashboardState> = {
  [SET_STATISTICS](state: DashboardState, list: any) {
    state.statistics = list;
  }
};
